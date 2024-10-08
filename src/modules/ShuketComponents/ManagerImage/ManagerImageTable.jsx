import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { filterLocate, headersLocate } from "./Helper/locate";
import { translate } from "../../../@crema/services/localization/translate";
import { limitType } from "./Helper/types";

export default function ManagerImageTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocate.kr);
      } else {
         setHeaders(headersLocate.en);
      }
   }, [locale]);

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
               <Stack sx={{ p: 5 }} direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                     <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <Select
                           size="small"
                           value={dataFilter.per_page}
                           onChange={(e) =>
                              changeDataFilterDirectly({
                                 ...dataFilter,
                                 per_page: e.target.value,
                              })
                           }
                        >
                           {limitType.map((ele) => (
                              <MenuItem key={ele} value={ele}>
                                 {ele}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                     <Typography>{translate(locale, filterLocate.per_page)} </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                     <Pagination count={5} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                  </Stack>
               </Stack>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     {headers.map((head) => (
                        <StyledTableCell key={head} align="center">
                           {head}
                        </StyledTableCell>
                     ))}
                  </TableHead>
                  <TableBody>
                     {rows.map((row) => (
                        <TableRow key={row?.mart_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="center">{row?.bnr_code}</TableCell>
                           <TableCell align="center">
                              <img style={{ width: 120 }} alt="" src={row?.bnr_image} />
                           </TableCell>

                           <TableCell align="center">
                              이미지명 : {row?.bnr_name}
                              <br />
                              파일명 : {row?.bnr_file_nm}
                           </TableCell>
                           <TableCell align="center">{row?.bnr_type}</TableCell>
                           <TableCell align="center">{row?.bnr_cate}</TableCell>
                           <TableCell align="center">
                              <p>{row?.c_time}</p>
                              <small>Created by: {row?.c_admin}</small>
                              <p>{row?.m_time}</p>
                              <small>Last updated by: {row?.m_admin}</small>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Divider />
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="center" spacing={2}>
                        <Pagination count={5} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
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
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));
