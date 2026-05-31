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

export const CrashText = styled.p`
  margin: 0;
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

export const HistoryBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px; 
  background: #33265c; 
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  box-sizing: border-box;
`;

export const MultiplierBadge = styled.span<{ bgColor?: string }>`
  background: ${({ bgColor }) => bgColor || "#5b4b8a"};
  color: black;
  font-size: 15px; 
  font-weight: 700;
  
  min-width: 65px;
  padding: 2px 10px; 
  display: inline-flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 30px;
  border: 1px solid #000000;
  
  box-sizing: border-box;
`;