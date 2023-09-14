import { Button } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  #fade-button {
    margin-right: auto;
  }
`;
export const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StyledLi = styled.li`
  margin-bottom: 8px;
`;

export const StyledBtn = styled(Button)`
  margin: 10px auto 0 0 !important;
`;
export const InputContainer = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 90px;
  row-gap: 40px;
  margin-bottom: 50px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ResultWrap = styled.div`
  margin: 0 auto;

  margin-top: 70px;
  h2 {
    text-align: center;
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;
