import * as S from "./styles";

import { BetControls } from "./Controls";

export function Layout() {
  return (
    
    <S.Container>

      <S.Header />

      <S.Content>
        <S.BetsPanel />
        {/* SEM O "S.", pois é um componente React completo */}
      
      </S.Content>

      <S.BottomPanel>
        {/* SEM O "S.", pois veio do import da linha 4 */}
        <BetControls />
      </S.BottomPanel>
    </S.Container>
  );
}