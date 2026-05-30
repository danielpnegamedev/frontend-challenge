import * as S from "./styles";
import { connectWebSocket } from "../../game/websocket";
import { useEffect, useRef, useState } from 'react';

type ButtonStatus = 'placebet' | 'cancel' | 'cashout' | 'waiting';

export function Controls() {

  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>('waiting');
  const [betPlaced, setBetPlaced] = useState(false);
  const [amount, setAmount] = useState(1);
  const betPlacedRef = useRef(false);

  const formatMoney = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const changeAmount = (delta: number) => {
    setAmount((current) => {
      const next = Math.max(0.5, Math.round((current + delta) * 2) / 2);
      return next;
    });
  };

  const selectPresetAmount = (value: number) => {
    setAmount(value);
  };

  useEffect(() => {
    connectWebSocket((message) => {
      const phase = message?.data?.phase;

      if (phase === 'betting') {
        setButtonStatus(betPlacedRef.current ? 'cancel' : 'placebet');
      } else if (phase === 'running') {
        setButtonStatus(betPlacedRef.current ? 'cashout' : 'waiting');
      } else if (phase === 'crash') {
        setBetPlaced(false);
        betPlacedRef.current = false;
        setButtonStatus('waiting');
      } else {
        setButtonStatus('waiting');
      }
    });
  }, []);

  const handleButtonClick = () => {
    if (buttonStatus === 'placebet') {
      setBetPlaced(true);
      betPlacedRef.current = true;
      setButtonStatus('cancel');
      return;
    }

    if (buttonStatus === 'cancel') {
      setBetPlaced(false);
      betPlacedRef.current = false;
      setButtonStatus('placebet');
      return;
    }

    if (buttonStatus === 'cashout') {
      setBetPlaced(false);
      betPlacedRef.current = false;
      setButtonStatus('waiting');
      return;
    }
  };

  const variant =
    buttonStatus === 'placebet' ? 'place' :
    buttonStatus === 'cancel' ? 'cancel' :
    buttonStatus === 'cashout' ? 'cashout' :
    'waiting';

  const label =
    buttonStatus === 'placebet' ? 'PLACEBET' :
    buttonStatus === 'cancel' ? 'CANCEL' :
    buttonStatus === 'cashout' ? 'CASHOUT' :
    'WAITING...';

  const isBettingPhase = buttonStatus === 'placebet' || buttonStatus === 'cancel';

  return (
    <S.Wrapper>
      <S.LeftControls>
        <S.AmountSelector>
          <S.AmountBtn type="button" onClick={() => changeAmount(-0.5)} disabled={!isBettingPhase}>-</S.AmountBtn>
          <S.AmountValue disabled={!isBettingPhase}>{formatMoney(amount)}</S.AmountValue>
          <S.AmountBtn type="button" onClick={() => changeAmount(0.5)} disabled={!isBettingPhase}>+</S.AmountBtn>
        </S.AmountSelector>

        <S.BetValuesGrid>
          <S.BetValueBtn type="button" onClick={() => selectPresetAmount(1)} disabled={!isBettingPhase}>$1</S.BetValueBtn>
          <S.BetValueBtn type="button" onClick={() => selectPresetAmount(5)} disabled={!isBettingPhase}>$5</S.BetValueBtn>
          <S.BetValueBtn type="button" onClick={() => selectPresetAmount(10)} disabled={!isBettingPhase}>$10</S.BetValueBtn>
          <S.BetValueBtn type="button" onClick={() => selectPresetAmount(20)} disabled={!isBettingPhase}>$20</S.BetValueBtn>
        </S.BetValuesGrid>
      </S.LeftControls>

      {/* Agora o variante e o texto vão mudar dinamicamente */}
      <S.PlaceBetBtn variant={variant} onClick={handleButtonClick}>
        <S.PlaceBetLabel>{label}</S.PlaceBetLabel>
        {buttonStatus === 'placebet' && (
          <S.PlaceBetAmount>{formatMoney(amount)}</S.PlaceBetAmount>
        )}
      </S.PlaceBetBtn>
    </S.Wrapper>
  );
}
