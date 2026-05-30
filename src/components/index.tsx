import * as S from "./styles";

import { Crash } from "./Crash";
import { Controls } from "./Controls";


export function Layout() {
  return (
    
    <S.Container>

      <S.Header />

      <S.Content>
        <S.BetsPanel/>  
          
        <S.GameArea>  
                <Crash />
        </S.GameArea>
      </S.Content>

      <S.BottomPanel>
        <Controls />
      </S.BottomPanel>

    </S.Container>
  );
}