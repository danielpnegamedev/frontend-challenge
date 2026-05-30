import * as S from "./styles";

export function Controls() {
  // Dica profissional: Estados de controle de valor entrariam aqui futuramente
  // const [amount, setAmount] = useState(1.00);

  return (
    <S.Wrapper>
      <S.LeftControls>
        <S.AmountSelector>
          <S.AmountBtn>-</S.AmountBtn>
          <S.AmountValue>$1.00</S.AmountValue>
          <S.AmountBtn>+</S.AmountBtn>
        </S.AmountSelector>

        <S.BetValuesGrid>
          <S.BetValueBtn>$1</S.BetValueBtn>
          <S.BetValueBtn>$5</S.BetValueBtn>
          <S.BetValueBtn>$10</S.BetValueBtn>
          <S.BetValueBtn>$20</S.BetValueBtn>
        </S.BetValuesGrid>
      </S.LeftControls>

      <S.PlaceBetBtn>BET</S.PlaceBetBtn>
    </S.Wrapper>
  );
}