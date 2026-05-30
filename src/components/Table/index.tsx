import * as S from "./styles"; 

export function Table() {
  return (
    <S.TableContainer>
      <S.StyledTable>
        
        <S.TableHead>
          <S.TableRow>
            <S.TableHeaderCell>User</S.TableHeaderCell>
            <S.TableHeaderCell>Bet USD</S.TableHeaderCell>
            <S.TableHeaderCell>Multiplier</S.TableHeaderCell>
            <S.TableHeaderCell>Bet</S.TableHeaderCell>
          </S.TableRow>
        </S.TableHead>

        <tbody>
          <S.TableRow>
            <S.TableCell>User_01</S.TableCell>
            <S.TableCell>14:32</S.TableCell>
            <S.TableCell>R$ 10,00</S.TableCell>
            <S.TableCell>2.00x</S.TableCell>
          </S.TableRow>

          <S.TableRow>
            <S.TableCell>User_02</S.TableCell>
            <S.TableCell>14:31</S.TableCell>
            <S.TableCell>R$ 50,00</S.TableCell>
            <S.TableCell>1.50x</S.TableCell>
          </S.TableRow>

          <S.TableRow>
            <S.TableCell>User_03</S.TableCell>
            <S.TableCell>14:30</S.TableCell>
            <S.TableCell>R$ 5,00</S.TableCell>
            <S.TableCell>10.00x</S.TableCell>
          </S.TableRow>
        </tbody>

      </S.StyledTable>
    </S.TableContainer>
  );
}