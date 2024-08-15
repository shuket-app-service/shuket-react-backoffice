import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { filterLocate, headersLocate } from "./helper/locate";
import { limitType } from "./helper/types";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

export default function ManagerOrderTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   const navigate = useNavigate()

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocate.kr);
      } else {
         setHeaders(headersLocate.en);
      }
   }, [locale]);

   const gotoDetail = (code) =>{
      navigate(`/marts/manage-order-moa-service/detail?ord_code=${code}&mart_code=${dataFilter.search_mart}`)
   }

   const gotoPrint = (code) => {
      navigate(`/marts/order/print?orderlist_ids=${code}`)
   }
   return (
      <>
         <Box>
            <TableContainer component={Paper}>
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Stack direction="row" alignItems={"center"} gap={2}>
                        <Typography>
                        Total: <b>{searchCount}</b>
                     </Typography>
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
                           <Typography>{translate(locale, filterLocate.limit)} </Typography>
                        </Stack>

                        <Pagination count={pageCount} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
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
                        <TableRow key={row?.od_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="center">{index + 1}</TableCell>
                           <TableCell align="center">
                              {row?.od_code}
                              <hr />
                              {row?.od_date}
                              <br />
                              {row?.od_time}
                           </TableCell>
                           <TableCell align="center">{row?.od_customer}</TableCell>
                           <TableCell align="center">{row?.od_address} </TableCell>
                           <TableCell align="center">{row?.od_goods_cnt} </TableCell>
                           <TableCell align="center">
                              <CurrencyFormat value={row?.od_total_pr} displayType={"text"} thousandSeparator={true}></CurrencyFormat>
                           </TableCell>
                           <TableCell align="center">
                              <CurrencyFormat value={row?.od_shipping} displayType={"text"} thousandSeparator={true}></CurrencyFormat>
                           </TableCell>
                           <TableCell align="center">{row?.delivery_text} </TableCell>
                           <TableCell align="center">{row?.od_coupon_dc} </TableCell>
                           <TableCell align="center">{row?.od_point_dc} </TableCell>
                           <TableCell align="center">{row?.od_bill_pr} </TableCell>
                           <TableCell align="center">{row?.od_pay_txt} </TableCell>
                           <TableCell align="center" sx={{ minWidth: 150 }}>
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <div style={{ width: 25, backgroundColor: row?.od_cl_box }}>{""}</div>
                                 <p style={{ color: row?.od_cl_text }}> {row?.od_status_txt}</p>
                              </Stack>
                           </TableCell>

                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <Button variant="outlined" size="small" onClick={()=>gotoDetail(row?.od_code)}>
                                    {translate(locale, filterLocate.btnView)}
                                 </Button>
                                 <Button variant="outlined" color="warning" size="small" onClick={()=>gotoPrint(row?.od_code)}>
                                    {translate(locale, filterLocate.btnPrint)}
                                 </Button>
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
