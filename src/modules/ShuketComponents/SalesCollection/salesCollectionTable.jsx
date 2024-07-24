import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { filterLocate, headersLocate } from "./locate";
import { orderType, limitType } from "../Helper/types";
import { translate } from "../../../@crema/services/localization/translate";

export default function SalesCollectionTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
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
                     <Typography>
                        Total: <b>{searchCount}</b>
                     </Typography>

                     <Typography> {translate(locale, filterLocate.orderBy)} </Typography>
                     <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <Select
                           size="small"
                           value={dataFilter.order_by}
                           onChange={(e) =>
                              changeDataFilterDirectly({
                                 ...dataFilter,
                                 order_by: e.target.value,
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
                     <Typography>{translate(locale, filterLocate.limit)} </Typography>
                     <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <Select
                           size="small"
                           value={dataFilter.limit}
                           onChange={(e) =>
                              changeDataFilterDirectly({
                                 ...dataFilter,
                                 limit: e.target.value,
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
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                     <Pagination count={pageCount} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
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
                        <TableRow key={row.mart_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                           <TableCell align="center">{row.status === "A" ? "활성화" : ""}</TableCell>
                           <TableCell align="center">
                              <Button color="primary" variant="outlined">
                                 {translate(locale, filterLocate.btnEdit)}
                              </Button>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Divider />
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="center" spacing={2}>
                        <Pagination count={pageCount} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
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
