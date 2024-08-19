import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, TextField, Typography } from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { filterLocate, headersLocate } from "./helper/locate";
import { limitType } from "./helper/types";
import "./style/index.css";
import DeliveryAreaSetMulti from "./DeliveryAreaSetMulti";
import { toast } from 'react-toastify';
import { alertChooseAddress } from "./helper/alert";

export default function DeliveryAreaTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   const [dataEdit, setDataEdit] = useState(null);
   const [dataChecked, setDataChecked] = useState([]);
   const [openMulti, setOpenMulti] = useState(false);


   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocate.kr);
      } else {
         setHeaders(headersLocate.en);
      }
   }, [locale]);

   const handleEdit = (seq, delivery_fee) => {
      console.log(seq, delivery_fee);
      setDataEdit({ seq: seq, delivery_fee: delivery_fee });
   };

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

   const handleCloseMulti = () =>{
      setOpenMulti(false)
   }

   const handleOpenSetMulti = () =>{
      if(dataChecked.length === 0){
         toast.error(translate(locale, alertChooseAddress))
      }else{
         setOpenMulti(true)
      }
   }
   return (
      <>
         <Box>
            <DeliveryAreaSetMulti openMulti={openMulti} handleCloseMulti={handleCloseMulti} locale={locale}/>
            <TableContainer component={Paper}>
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Stack direction="row" alignItems={"center"} gap={4}>
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
                           <Button variant="outlined" onClick={handleOpenSetMulti}> {translate(locale, filterLocate.btnSetMulti)}</Button>
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
                           <TableCell align="center">{index + 1}</TableCell>
                           <TableCell align="center">{row?.region_1depth_name}</TableCell>
                           <TableCell align="center">
                              {row?.region_2depth_name}
                              <br />({row?.zone_no}){" "}
                           </TableCell>
                           <TableCell align="center">
                              {row?.road_address_name}
                              <br />
                              {row?.address_name}
                           </TableCell>
                           <TableCell align="center">
                              <Table border={1}>
                                 {row?.delivery_fee?.map((ele, index) => {
                                    return (
                                       <TableRow className={`${ele.class}`}>
                                          <TableCell align="center" sx={{ width: 100 }}>
                                             {ele?.name}
                                          </TableCell>
                                          <TableCell align="center" sx={{ width: 100 }}>
                                             {dataEdit && dataEdit?.seq === row?.seq ? (
                                                <TextField size="small" type="text" defaultValue={dataEdit?.delivery_fee[index]?.value_fee}></TextField>
                                             ) : (
                                                <b> {ele?.value_fee}</b>
                                             )}
                                          </TableCell>
                                          <TableCell align="center" sx={{ width: 100 }}>
                                             {dataEdit && dataEdit?.seq === row?.seq ? (
                                                <TextField size="small" type="text" defaultValue={dataEdit?.delivery_fee[index]?.value_time}></TextField>
                                             ) : (
                                                <b> {ele?.value_time}</b>
                                             )}
                                          </TableCell>

                                          <TableCell sx={{ width: 100 }} align="center">
                                             {ele?.option_use ? "YES" : "NO"}
                                          </TableCell>
                                       </TableRow>
                                    );
                                 })}
                              </Table>
                           </TableCell>

                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 {dataEdit && dataEdit?.seq === row?.seq ? (
                                    <Button variant="contained">{translate(locale, filterLocate.btnSave)}</Button>
                                 ) : (
                                    <Button variant="outlined" color="warning" onClick={() => handleEdit(row?.seq, row?.delivery_fee)}>
                                       {translate(locale, filterLocate.btnEdit)}
                                    </Button>
                                 )}
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
