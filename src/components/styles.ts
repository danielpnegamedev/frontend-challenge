import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #2b2150;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 60px;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  padding: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 4px;
    gap: 4px;
  }
`;

export const BetsPanel = styled.div`
  width: 300px;
  background: #4b3a7a;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 180px;
    order: 2;
  }
`;

export const GameArea = styled.div`
  flex: 1;
  background: #4b3a7a;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 0;
    order: 1;
  }
`;

export const BottomPanel = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3d2c6b;

  @media (max-width: 768px) {
    height: auto;
    padding: 12px;
  }
`;