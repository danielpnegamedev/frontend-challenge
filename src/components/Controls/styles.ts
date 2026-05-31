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

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const AmountValue = styled.div<{ disabled?: boolean }>`
  height: 40%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d0f4d;
  color: white;
  font-size: 24px;
  font-weight: bold;
  opacity: ${({ disabled }) => disabled ? 0.4 : 1};
  transition: opacity 0.2s ease;
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

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    border-color: rgba(255,255,255,0.4);
  }
`;

export const PlaceBetBtn = styled.button<{ variant?: 'place' | 'cancel' | 'cashout'; isWaiting?: boolean }>`
  margin-left: 16px;
  width: 180px;
  height: 70px;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  /* Mantém apenas as cores originais dos botões */
  background: ${({ variant }) =>
    variant === 'place' ? '#39ff14' :
    variant === 'cancel' ? '#ff4d4d' : '#ffd700'};
  
  color: black;
  font-weight: bold;
  transition: opacity 0.3s ease, transform 0.1s ease;

  /* Quando o estado for waiting, ele simplesmente aplica a opacidade e bloqueia eventos */
  ${({ isWaiting }) => isWaiting && `
    opacity: 0.45;
    pointer-events: none;
    cursor: not-allowed;
  `}

  &:active {
    transform: ${({ isWaiting }) => (isWaiting ? 'none' : 'scale(0.98)')};
  }
`;

export const PlaceBetLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const PlaceBetAmount = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 4px;
`;
