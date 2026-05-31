import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 60px;
  background: #3d2c6b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: white;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const OnlineBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #3bb2b8;
  color: #3bb2b8;
`;

export const TimerDisplay = styled.div`
  font-family: monospace;
  font-size: 14px;
  color: #cac6d8;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const TimeDisplay = styled.div`
  font-size: 14px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #cac6d8;
`;