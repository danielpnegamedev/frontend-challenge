import * as S from "./styles";

import { Crash } from "./Crash";
import { Controls } from "./Controls";
import { Table }  from "./Table";
import { Header } from "./Header";

export function Layout() {
  return (
    
    <S.Container>

      <Header />

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