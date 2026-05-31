import { useEffect, useState, useRef } from 'react';
import * as S from "./styles";
import { connectWebSocket } from "../../game/websocket";
import { initGame, updateMultiplierText, setSpinning } from '../../game';

const getColorFromNumber = (num: number) => {
  const seed = Math.floor(num * 12345);
  return `hsl(${seed % 1000}, 100%, 65%)`;
};

export function Crash() {
  const [multiplier, setMultiplier] = useState(1);
  const [history, setHistory] = useState<number[]>([]);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    let pixiApp: any = null;

    if (gameContainerRef.current && !isInitialized.current) {
      isInitialized.current = true;
      initGame(gameContainerRef.current).then((app) => {
        pixiApp = app;
      });
    }

    return () => {
      if (pixiApp) {
        pixiApp.destroy(true, { children: true, texture: true });
        isInitialized.current = false;
      }
    };
  }, []);

  useEffect(() => {
    updateMultiplierText(multiplier);
  }, [multiplier]);

  useEffect(() => {
    connectWebSocket((message: any) => {
      const phase = message?.data?.phase;
      const value = message?.data?.multiplier;

      if (phase === 'running') {
        setSpinning(true);
      } else {
        setSpinning(false);
      }

      if (typeof value === "number") setMultiplier(value);

      const serverHistory = message?.data?.history;
      if (Array.isArray(serverHistory)) {
        setHistory(serverHistory.slice(-6).map((item: any) => item.crashPoint).reverse());
      }
    });
  }, []);

  const historyBadges = [...history, ...Array(6 - history.length).fill(null)].slice(0, 6);

  return (
    <S.Wrapper>
      <S.HistoryBarContainer>
        {historyBadges.map((value, index) => (
          <S.MultiplierBadge
            key={index}
            bgColor={value != null ? getColorFromNumber(value) : undefined}
          >
            {value != null ? value.toFixed(2) : "-"}
          </S.MultiplierBadge>
        ))}
      </S.HistoryBarContainer>
      <div ref={gameContainerRef} style={{ width: '100%', height: '100%', marginTop: '40px' }} />
    </S.Wrapper>
  );
}