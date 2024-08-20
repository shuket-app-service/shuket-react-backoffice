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
   Button,
   Card,
   CardContent,
   Checkbox,
   Divider,
   FormControl,
   FormControlLabel,
   IconButton,
   MenuItem,
   Pagination,
   Select,
   Stack,
   styled,
   TableFooter,
   TablePagination,
   Typography,
} from "@mui/material";
import { filterLocate, headersLocate, tableLocate } from "./helper/locate";
import { limitType, orderType } from "./helper/types";
import { translate } from "../../../../../@crema/services/localization/translate";
import { toast } from 'react-toastify';

import ProductPriceSet from "./ProductPriceSet";
import { alertChooseProduct } from "./helper/alert";

export default function ProductPriceTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   const [dataChecked, setDataChecked] = useState([]);
   const [openSetPrice, setOpenSetPrice] = useState([]);

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

   const handleChangeDataPrice = async (e, seq) => {
      let newData = openSetPrice.map((ele)=> {
         if(ele.seq === seq){
            return {...ele,   [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value}
         }else{
            return ele
         }
      })
      setOpenSetPrice(newData)
   };

   const handleSetPrice = (row) =>{
      setOpenSetPrice([row])
   }
   const handleCloseSetPrice = () =>{
      setOpenSetPrice([])
   }
   const handelSetPriceMulti = () =>{
      if(dataChecked.length === 0){
         toast.error(translate(locale, alertChooseProduct))
      }else{
         const arrWillSet = rows.filter((fi) => dataChecked.includes(fi.seq))
         setOpenSetPrice(arrWillSet)
      }
   }

   return (
      <>
         <Box>
            <ProductPriceSet openSetPrice={openSetPrice} handleCloseSetPrice={handleCloseSetPrice} handleChangeDataPrice={handleChangeDataPrice} locale={locale}></ProductPriceSet>
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
                           <Button variant="outlined" onClick={handelSetPriceMulti}>{translate(locale, tableLocate.btnSetPriceMulti)} </Button>
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
                              <img src={row?.images?.[0]?.thumb} style={{ width: 150, cursor: "pointer" }} onClick={() => handleSetDetail(row)} />
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
                              <Typography>
                                 <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.category)}</span>
                                 <span> {row?.category}</span>
                              </Typography>
                              <Typography>
                                 <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.name)}</span>
                                 <span> {row?.name}</span>
                              </Typography>
                              <Typography>
                                 <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.unit)}</span>
                                 <span> {row?.unit}</span>
                              </Typography>
                              <Typography>
                                 <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.tags)}</span>
                                 <span> {row?.tags}</span>
                              </Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>
                                 {row?.sale_price != 0 ? <s> {row?.list_price}원</s> : <b> {row?.list_price}원</b>}
                                 <br />

                                 {row?.sale_price != 0 && (
                                    <div>
                                       <b> {row?.sale_price}원</b>
                                       <b style={{ color: "red" }}>(- {((row?.sale_price / row?.list_price) * 10).toFixed(0)}%)</b>
                                    </div>
                                 )}
                              </Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>{row?.unit}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Typography>
                                 {row?.price_number}
                                 <br />
                                 <Button sx={{ mt: 2 }} variant="outlined" onClick={() => handleSetPrice(row)}>
                                    {translate(locale, tableLocate.btnSetPrice)}
                                 </Button>
                              </Typography>
                           </TableCell>
                           <TableCell align="center" sx={{ minWidth: 150 }}>
                              <Typography> {row?.create_time}</Typography>
                              <small>
                                 {" "}
                                 {translate(locale, tableLocate.createBy)} {row?.create_name}
                              </small>
                              <Divider sx={{ my: 2 }} />
                              <Typography>{row?.update_time}</Typography>
                              <small>
                                 {translate(locale, tableLocate.updateBy)}
                                 {row?.update_name}
                              </small>
                           </TableCell>
                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <Button variant="outlined" color="error">
                                    {translate(locale, filterLocate.btnDelete)}
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
