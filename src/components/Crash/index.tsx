import * as S from "./styles";

export function Crash() {
  return (
    <S.Wrapper>
      <S.HistoryBarContainer>
        <S.MultiplierBadge>10.00</S.MultiplierBadge>
        <S.MultiplierBadge>1.67</S.MultiplierBadge>
        <S.MultiplierBadge>5000.00</S.MultiplierBadge>
        <S.MultiplierBadge>5000.00</S.MultiplierBadge>
        <S.MultiplierBadge>5000.00</S.MultiplierBadge>
    </S.HistoryBarContainer>
      <S.CrashText> $1.00 </S.CrashText>
    </S.Wrapper>
  );
}