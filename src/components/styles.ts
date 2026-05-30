import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #2b2150;
  display: flex;
  flex-direction: column;
  color: white;
`;

export const Header = styled.div`
  height: 60px;
  background: #3d2c6b;
`;


export const Content = styled.div`
  flex: 1;

  display: flex;
  gap: 8px;

  padding: 8px;
`;

export const GameArea = styled.div`
  flex: 1;
  background: #4b3a7a;

  position: relative; 

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 72px;
  font-weight: bold;
`;

export const BetsPanel = styled.div`
  width: 220px;
  background: #4b3a7a;
`;

export const BottomPanel = styled.div`
  height: 120px;
  background: #3d2c6b;
  display: flex;
  justify-content: center;
  align-items: center;
`;