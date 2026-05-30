import { useEffect, useState } from 'react';
import * as S from "./styles";
import { connectWebSocket } from "../../game/websocket";


export function Crash() {
  const [multiplier, setMultiplier] = useState(1);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    connectWebSocket((message) => {
      const value = message?.data?.multiplier;
      if (typeof value === "number") {
        setMultiplier(value);
      }

      const serverHistory = message?.data?.history;
      if (Array.isArray(serverHistory)) {
        const lastValues = serverHistory
          .slice(-6)
          .map((item: any) => item.crashPoint)
          .reverse();
        setHistory(lastValues);
      }
    });
  }, []);

  const historyBadges = [...history, ...Array(6 - history.length).fill(null)].slice(0, 6);

  return (
    <S.Wrapper>

      <S.HistoryBarContainer>
        {historyBadges.map((value, index) => (
          <S.MultiplierBadge key={index}>
            {value != null ? value.toFixed(2) : "-"}
          </S.MultiplierBadge>
        ))}
      </S.HistoryBarContainer>

      <S.CrashText>{multiplier.toFixed(2)}x</S.CrashText>
     
    </S.Wrapper>
  );
}