import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
 
export default function CustomTable({ data }) {
  return (
    <TableContainer>
      <Table sx={{ width: '100%', my: '1.25rem', letterSpacing: '0.03rem' }}>
        <TableHead>
          <TableRow sx={{ '& th:last-child': { borderRight: 0 } }}>
            {
              data?.[0]?.map((el, i) => 
                <TableCell key={i + 'head'} align="left" sx={{
                  color: '#a6a9b4', fontWeight: '700',
                  borderColor: '#555762', borderWidth: '2px',
                  borderRight: '2px solid #555762',
                }}>
                  {el}
                </TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.slice(1)?.map((row, i) => (
            <TableRow
              key={i + 'body-row'}
              sx={{
                '&:last-child td, &:last-child th': { border: 0, borderRight: '2px solid #555762', },
                '& td:last-child': { borderRight: 0 }
              }}
            >
              {
                row?.map((el, j) => 
                  <TableCell key={j + 'body'} align="left" sx={{
                    color: '#a6a9b4', fontWeight: '500',
                    borderColor: '#555762', borderWidth: '2px',
                    borderRight: '2px solid #555762',
                  }}>
                    {el}
                  </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
