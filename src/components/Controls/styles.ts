import styled from "styled-components";

export const Wrapper = styled.div`
  width: 400px;
  height: 70px;
  background: #5b4b8a;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftControls = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AmountSelector = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  border-radius: 8px;
`;

export const AmountBtn = styled.button`
  width: 40px;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #9f8cff;
  color: #1f1447;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

export const AmountValue = styled.div`
  height: 40%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d0f4d;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

export const BetValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export const BetValueBtn = styled.button`
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

export const PlaceBetBtn = styled.button`
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