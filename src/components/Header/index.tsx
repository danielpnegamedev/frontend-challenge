import { useEffect, useState, useRef } from "react";
import { connectWebSocket } from "../../game/websocket";
import * as S from "./styles";
import { Menu, Wifi } from "lucide-react";

export function Header() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [timerDisplay, setTimerDisplay] = useState("00:00:00");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const clock = setInterval(() => setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 60000);
    
    connectWebSocket((message) => {
      if (message?.type === 'online-count') {
        setOnlineCount(message.count);
      }

      const gameState = message?.gameState || message?.data;
      if (gameState?.phase === 'running') {
        if (!timerRef.current) {
          const start = Date.now();
          timerRef.current = window.setInterval(() => {
            const diff = Math.floor((Date.now() - start) / 1000);
            const m = Math.floor(diff / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            setTimerDisplay(`00:${m}:${s}`);
          }, 1000);
        }
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setTimerDisplay("00:00:00");
      }
    });

    return () => {
      clearInterval(clock);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <S.HeaderContainer>
      <S.HeaderLeft>
        <S.OnlineBadge>
          <span>👤</span> {String(onlineCount).padStart(2, '0')}
        </S.OnlineBadge>
        <S.TimerDisplay>{timerDisplay}</S.TimerDisplay>
      </S.HeaderLeft>
      <S.HeaderRight>
        <S.TimeDisplay>{currentTime}</S.TimeDisplay>
        <S.IconWrapper><Wifi size={18} /></S.IconWrapper>
        <S.IconWrapper><Menu size={20} /></S.IconWrapper>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
}