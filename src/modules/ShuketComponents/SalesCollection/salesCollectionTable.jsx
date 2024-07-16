import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
  styled,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";

const headers = [
  "No",
  "앱 유형",
  "마트 타입",
  "마트",
  "D2코드/포스코드",
  "재고연동",
  "주문연동",
  "도시",
  "구역",
  "날짜 등록",
  "상태",
  "등록",
];

export default function SalesCollectionTable({
  rows,
  dataFilter,
  pageCount,
  searchCount,
  handleChangePage,
}) {
  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              {headers.map((head) => (
                <StyledTableCell key={head} align="center">{head}</StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.mart_code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.number_order}</TableCell>
                  <TableCell align="center">{row.mart_type_name.kr}</TableCell>
                  <TableCell align="center">{row.mart_type}</TableCell>
                  <TableCell align="center">
                    {row.mart_name} <br />({row.mart_code})
                  </TableCell>
                  <TableCell align="center">
                    {row.pos_regcode} / {row.tposcode}
                  </TableCell>
                  <TableCell align="center">{row.is_tdc}</TableCell>
                  <TableCell align="center">{row.is_order_sync}</TableCell>
                  <TableCell align="center">{row.city_name.kr}</TableCell>
                  <TableCell align="center">{row.district_name.kr}</TableCell>
                  <TableCell align="center">{row.register_date}</TableCell>
                  <TableCell align="center">
                    {row.status === "A" ? "활성화" : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider/>
          <Card sx={{ borderRadius: 0 }}>
            <CardContent>
              <Stack
                sx={{ mt: 5 }}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography>Total: {searchCount}</Typography>
                <Pagination
                  count={pageCount}
                  page={dataFilter.page}
                  onChange={handleChangePage}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </CardContent>
          </Card>
        </TableContainer>
      </Box>
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
