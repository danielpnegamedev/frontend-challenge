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
  height: 40px; /* Altura da barra */
  background: #33265c; 
  
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
  
  box-sizing: border-box;
`;

export const MultiplierBadge = styled.span`
  background: #5b4b8a;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
`;