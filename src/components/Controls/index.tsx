import * as S from "./styles";
import { connectWebSocket, sendBet, sendCashout, sendCancelBet } from "../../game/websocket";
import { useEffect, useRef, useState } from "react";

// Mantemos os estados literais para o fluxo lógico
type ButtonStatus = "placebet" | "cancel" | "cashout" | "waiting";
const USER_ID = "user123";

export function Controls() {
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>("waiting");
  const [betPlaced, setBetPlaced] = useState(false);
  const [amount, setAmount] = useState(1);
  const betPlacedRef = useRef(false);

  const formatMoney = (value: number) => `$${value.toFixed(2)}`;

  const changeAmount = (delta: number) => {
    setAmount((current) => Math.max(0.5, Math.round((current + delta) * 2) / 2));
  };

  const selectPresetAmount = (value: number) => {
    setAmount(value);
  };

  useEffect(() => {
    connectWebSocket((message) => {
      const phase = message?.data?.phase;

      switch (phase) {
        case "betting":
          setButtonStatus(betPlacedRef.current ? "cancel" : "placebet");
          break;

        case "running":
          // Se ele apostou, vira CASHOUT. Se não apostou nesta rodada, fica WAITING (mas com visual de placebet opaco)
          setButtonStatus(betPlacedRef.current ? "cashout" : "waiting");
          break;

        case "crash":
          setBetPlaced(false);
          betPlacedRef.current = false;
          setButtonStatus("waiting");
          break;

        case "bet-added":
          console.log("Aposta registrada");
          break;
      }
    });
  }, []);

  const handleButtonClick = () => {
    if (buttonStatus === "placebet") {
      sendBet(USER_ID, amount);

      setBetPlaced(true);
      betPlacedRef.current = true;
      setButtonStatus("cancel");
      return;
    }

    if (buttonStatus === "cancel") {
      sendCancelBet(USER_ID);
      setBetPlaced(false);
      betPlacedRef.current = false;
      setButtonStatus("placebet");
      return;
    }

    if (buttonStatus === "cashout") {
      sendCashout(USER_ID);

      setBetPlaced(false);
      betPlacedRef.current = false;
      setButtonStatus("waiting");
    }
  };

  // --- REGRAS VISUAIS CUSTOMIZADAS (SEM O ESTADO VISUAL 'WAITING') ---

  // Se o status for "waiting", o visual de fundo volta a ser o de "place" (ou mantém o último se preferir)
  const variant =
    buttonStatus === "placebet"
      ? "place"
      : buttonStatus === "cancel"
      ? "cancel"
      : buttonStatus === "cashout"
      ? "cashout"
      : "place"; // Quando em waiting, ele renderiza o design verde de aposta

  // O texto do label segue a mesma regra: se estiver esperando, exibe "PLACEBET"
  const label =
    buttonStatus === "placebet"
      ? "PLACE BET"
      : buttonStatus === "cancel"
      ? "CANCEL"
      : buttonStatus === "cashout"
      ? "CASHOUT"
      : "PLACEBET"; // Mantém o texto em vez de "WAITING..."

  // O botão só aceita cliques e interações nas fases ativas
  const isWaiting = buttonStatus === "waiting";
  const isBettingPhase = buttonStatus === "placebet";

  return (
    <S.Wrapper>
      <S.LeftControls>
        <S.AmountSelector>
          <S.AmountBtn
            type="button"
            onClick={() => changeAmount(-0.5)}
            disabled={!isBettingPhase}
          >
            -
          </S.AmountBtn>

          <S.AmountValue disabled={!isBettingPhase}>
            {formatMoney(amount)}
          </S.AmountValue>

          <S.AmountBtn
            type="button"
            onClick={() => changeAmount(0.5)}
            disabled={!isBettingPhase}
          >
            +
          </S.AmountBtn>
        </S.AmountSelector>

        <S.BetValuesGrid>
          <S.BetValueBtn
            type="button"
            onClick={() => selectPresetAmount(1)}
            disabled={!isBettingPhase}
          >
            $1
          </S.BetValueBtn>

          <S.BetValueBtn
            type="button"
            onClick={() => selectPresetAmount(5)}
            disabled={!isBettingPhase}
          >
            $5
          </S.BetValueBtn>

          <S.BetValueBtn
            type="button"
            onClick={() => selectPresetAmount(10)}
            disabled={!isBettingPhase}
          >
            $10
          </S.BetValueBtn>

          <S.BetValueBtn
            type="button"
            onClick={() => selectPresetAmount(20)}
            disabled={!isBettingPhase}
          >
            $20
          </S.BetValueBtn>
        </S.BetValuesGrid>
      </S.LeftControls>

      {/* Passamos a propriedade booleana `isWaiting` para o estilo cuidar do fade */}
      <S.PlaceBetBtn 
        variant={variant} 
        onClick={handleButtonClick} 
        isWaiting={isWaiting}
        disabled={isWaiting}
      >
        <S.PlaceBetLabel>{label}</S.PlaceBetLabel>
        {(buttonStatus === "placebet" || buttonStatus === "waiting") && (
          <S.PlaceBetAmount>{formatMoney(amount)}</S.PlaceBetAmount>
        )}
      </S.PlaceBetBtn>
    </S.Wrapper>
  );
}