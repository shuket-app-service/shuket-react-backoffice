import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { filterLocate, headersLocate, tableLocate } from "./helper/locate";
import { translate } from "../../../@crema/services/localization/translate";
import { limitType, orderType } from "./helper/types";

export default function AppVersionTable({ rows, dataFilter, changeDataFilter, pageCount, searchCount, handleChangePage, locale }) {
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
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Stack direction="row" alignItems={"center"} gap={2}>
                           <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Select
                                 size="small"
                                 value={dataFilter.per_page}
                                 onChange={(e) =>
                                    changeDataFilter({
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
                           <Typography>{translate(locale, filterLocate.limit)} </Typography>
                           <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Select
                                 size="small"
                                 value={dataFilter.search_method}
                                 onChange={(e) =>
                                    changeDataFilter({
                                       ...dataFilter,
                                       search_method: e.target.value,
                                    })
                                 }
                              >
                                 {orderType.map((ele) => (
                                    <MenuItem key={ele.value} value={ele.value}>
                                      {translate(locale, ele.text)}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>

                        </Stack>
                        <Pagination count={pageCount ? pageCount : 1} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />

                     </Stack>
                  </CardContent>
               </Card>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     {headers.map((head) => (
                        <StyledTableCell key={head} align="center">
                           {head}
                        </StyledTableCell>
                     ))}
                  </TableHead>
                  <TableBody>
                     {rows.map((row, index) => (
                        <TableRow key={row?.mart_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="center">{index + 1}</TableCell>
                           <TableCell align="center">{row?.mart_name} </TableCell>
                           <TableCell align="center">
                              {translate(locale, tableLocate.appVersion)} {row?.and?.ver_no} <br />
                              {translate(locale, tableLocate.action)} {row?.and?.ver_chk_type} <br />
                              {translate(locale, tableLocate.storeUrl)} {row?.and?.store_url}
                           </TableCell>
                           <TableCell align="center">
                              {translate(locale, tableLocate.appVersion)} {row?.ios?.ver_no} <br />
                              {translate(locale, tableLocate.action)} {row?.ios?.ver_chk_type} <br />
                              {translate(locale, tableLocate.storeUrl)} {row?.ios?.store_url}
                           </TableCell>

                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <Button variant="outlined"   color="warning"> {translate(locale, filterLocate.btnEdit)}</Button>
                              </Stack>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Divider />
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="center" spacing={2}>
                        <Pagination count={pageCount ? pageCount : 1} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
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
