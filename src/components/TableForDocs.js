import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(name, amount) {
  return { name, amount };
}

const TableForDocs = ({ currentData }) => {
  console.log("currentData for table: ", currentData);
  // Данные
  const rows = [];

  if (currentData) {
    const arrResultAllNameDocs = currentData
      .map((elem) => elem.docsUser)
      .flat();
    console.log("arrResultNameDocs: ", arrResultAllNameDocs);

    const count = arrResultAllNameDocs.reduce((acc, elem) => {
      acc[elem] = (acc[elem] || 0) + 1;
      return acc;
    }, {});

    const resultArrayNameAndCount = Object.entries(count).sort(
      ([, valueA], [, valueB]) => valueB - valueA
    );

    resultArrayNameAndCount.forEach(([key, value]) => {
      rows.push(createData(key, value));
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Наименование документа</TableCell>
            <TableCell align="right">Количество заявок</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableForDocs;
