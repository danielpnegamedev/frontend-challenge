import styled from "styled-components";

export const TableContainer = styled.div`
  flex: 1;
  min-width: 0; 
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #2b1d54;
  background-color: #3d2c6b;
  overflow: hidden; 
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: system-ui, -apple-system, sans-serif;
  table-layout: auto;
`;

export const TableHead = styled.thead`
  background-color: transparent;
  border-bottom: 2px solid #2b1d54;
`;

export const TableRow = styled.tr`
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #4c3785;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 10px 6px; 
  font-size: 11px; 
  font-weight: 700;
  color: #3bb2b8;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

export const TableCell = styled.td<{ isMultiplier?: boolean }>`
  padding: 10px 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ isMultiplier }) => (isMultiplier ? "#2de322" : "#ffffff")};
  border-bottom: 1px solid #2b1d54;
  white-space: nowrap;
`;