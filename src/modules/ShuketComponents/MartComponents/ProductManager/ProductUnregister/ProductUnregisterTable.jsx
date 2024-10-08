import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, IconButton, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { filterLocate, headersLocate, tableLocate } from "./helper/locate";
import { limitType, orderType } from "./helper/types";
import { translate } from "../../../../../@crema/services/localization/translate";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import SwitchStatus from "../../../Common/SwitchStatus";
import { RiSubtractFill } from "react-icons/ri";
import { HiOutlinePlusSm } from "react-icons/hi";

export default function ProductUnregisterTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   const [dataChecked, setDataChecked] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocate.kr);
      } else {
         setHeaders(headersLocate.en);
      }
   }, [locale]);

   const handleClickAll = () => {
      if (!dataChecked.length) {
         const data = rows.map((r) => r?.seq);
         setDataChecked(data);
      } else {
         if (dataChecked.length === rows.length) {
            setDataChecked([]);
         } else {
            const data = rows.map((r) => r?.seq);
            setDataChecked(data);
         }
      }
   };
   const handleChecked = (seq) => {
      if (dataChecked.findIndex((ele) => ele === seq) == -1) {
         setDataChecked([...dataChecked, seq]);
      } else {
         let temp = dataChecked.filter((ele) => ele !== seq);
         setDataChecked(temp);
      }
   };

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
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

                        <Pagination count={pageCount} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                     </Stack>
                  </CardContent>
               </Card>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <StyledTableCell>
                        <Checkbox color="default" onClick={handleClickAll} />
                     </StyledTableCell>
                     {headers.map((head) => (
                        <StyledTableCell key={head} align="center">
                           {head}
                        </StyledTableCell>
                     ))}
                  </TableHead>
                  <TableBody>
                     {rows.map((row, index) => (
                        <TableRow key={row?.seq} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell>
                              <Checkbox onClick={() => handleChecked(row?.seq)} checked={dataChecked.findIndex((ele) => ele === row?.seq) !== -1 ? true : false}></Checkbox>
                           </TableCell>
                           <TableCell align="left">{index + 1}</TableCell>
                           <TableCell align="left">
                              <img src={row?.images?.[0]?.image_uri} style={{ width: 150 }} />
                           </TableCell>
                           <TableCell align="left" sx={{ width: 300 }}>
                              <Typography>
                                 <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.code)}</span>
                                 <span> {row?.code}</span>
                              </Typography>
                              <Typography>
                                 <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.barcode)} </span>
                                 <span> {row?.barcode}</span>
                              </Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.name}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.category && row?.category}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.category_sub && row?.category_sub}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.list_price}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.unit}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.provider}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <Button variant="outlined" color="warning">
                                    {translate(locale, filterLocate.btnRegister)}
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
                     <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="left" spacing={2}>
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
