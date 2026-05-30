import * as S from "./styles";

import { Crash } from "./Crash";
import { Controls } from "./Controls";
import { Table }  from "./Table";

export function Layout() {
  return (
    
    <S.Container>

      <S.Header />

      <S.Content>
      
        <S.BetsPanel>
          <Table />
        </S.BetsPanel>
          
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