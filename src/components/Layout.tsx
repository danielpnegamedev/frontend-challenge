import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background: #2b2150;

  display: flex;
  flex-direction: column;

  color: white;
`;

const Header = styled.div`
  height: 60px;
  background: #3d2c6b;
`;

const Content = styled.div`
  flex: 1;

  display: flex;
  gap: 8px;

  padding: 8px;
`;

const BetsPanel = styled.div`
  width: 220px;
  background: #4b3a7a;
`;

// GAME AREA PANEL
const GameArea = styled.div`
  flex: 1;
  background: #4b3a7a;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 72px;
  font-weight: bold;
`;
const Label = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

// BOTTOM PANEL
const BottomPanel = styled.div`
  height: 120px;
  background: #3d2c6b;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BetControls = styled.div`
  width: 400px;
  height: 70px;

  background: #5b4b8a;

  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceBetBtn = styled.button`
  margin-left: 16px;
  width: 180px;
  height: 50px;

  background: #39ff14;
  color: black;

  border: none;
  border-radius: 8px;

  font-size: 18px;
  font-weight: bold;

  cursor: pointer;
`;

const BetValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const BetValueBtn = styled.button`
  width: 60px;
  height: 20px;

  background: transparent;
  color: white;

  border: 1px solid white;
  border-radius: 8px;

  font-size: 18px;
  font-weight: bold;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: black;
  }
`;




export function Layout() {
  return (
    <Container>
      <Header />

      <Content>
        <BetsPanel />

        <GameArea>
          <Label>2,00x</Label>
        </GameArea>
      </Content>

      <BottomPanel>
        <BetControls >
           <BetValuesGrid>
              <BetValueBtn> $1 </BetValueBtn>
              <BetValueBtn> $5 </BetValueBtn>
              <BetValueBtn> $10 </BetValueBtn>
              <BetValueBtn> $20 </BetValueBtn>
  </BetValuesGrid>
            <PlaceBetBtn> BET </PlaceBetBtn>
         </BetControls>
      </BottomPanel>
    </Container>
  );
}