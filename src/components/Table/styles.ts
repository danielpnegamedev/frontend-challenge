import styled from "styled-components";

export const TableContainer = styled.div`
  /* Faz o container aceitar e calcular o espaço correto dentro do display: flex do Content */
  flex: 1;
  min-width: 0; 
  
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #2b2150;
  background-color: #ffffff;
  overflow: hidden; 
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: system-ui, -apple-system, sans-serif;
  table-layout: auto; /* Deixa o navegador esticar as colunas conforme o texto */
`;

export const TableHead = styled.thead`
  background-color: #f8fafc;
  border-bottom: 2px solid #2b2150;
`;

export const TableRow = styled.tr`
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #2b2150;
  }
`;

export const TableHeaderCell = styled.th`
  /* Reduzido o padding lateral para 6px para o texto não ser espremido pelas bordas */
  padding: 10px 6px; 
  font-size: 11px; /* Fonte levemente menor para garantir que caiba em telas estreitas */
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  /* Padding reduzido para dar o máximo de espaço possível para o texto */
  padding: 10px 6px;
  font-size: 12px;
  color: #2b2150;
  border-bottom: 1px solid #2b2150;
  white-space: nowrap;
`;