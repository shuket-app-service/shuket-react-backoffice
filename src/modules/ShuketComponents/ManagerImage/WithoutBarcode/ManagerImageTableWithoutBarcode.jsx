import React, { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { filterLocaleWithBarcode, filterLocate, headersLocateWithoutBarcode } from "../Helper/locate";
import { translate } from "../../../../@crema/services/localization/translate";
import { limitType, orderEstType, orderType, statusType } from "../Helper/types";
import SwitchStatus from "../../Common/SwitchStatus";
import { MdOutlineModeEdit } from "react-icons/md";
import ManagerImageEditWithoutBarcode from "./ManagerImageEditWithoutBarcode";

export default function ManagerImageTableWithoutBarcode({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   const [collapseData, setCollapseData] = useState(null);
   const [dataChecked, setDataChecked] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocateWithoutBarcode.kr);
      } else {
         setHeaders(headersLocateWithoutBarcode.en);
      }
   }, [locale]);

   const handleClickAll = () =>{
      if(!dataChecked.length){
         const data = rows.map( r => r?.prd_img_code)
         setDataChecked(data)
      }else{
         setDataChecked([])
      }
   }
   const handleChecked = (code) =>{
      if((dataChecked.findIndex((ele) => ele === code)) == -1){
         setDataChecked([...dataChecked, code])
      }else{
         let temp = dataChecked.filter((ele) => ele !== code)
         setDataChecked(temp)
      }
   }

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
            <Stack sx={{ p: 5 }} direction="row" justifyContent="start" alignItems="center" spacing={5}>
                     <Typography>{translate(locale, filterLocate.status)}</Typography>
                     <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <Select displayEmpty={true} value={""}>
                           {statusType.map((ele) => (
                              <MenuItem key={ele.value} value={ele.value}>
                                 {translate(locale, ele.text)}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                     <Button variant="outlined">{translate(locale, filterLocaleWithBarcode.btnChangeStatus)}</Button>
                     <Button variant="outlined">{translate(locale, filterLocaleWithBarcode.btnSyncImage)}</Button>

                  </Stack>
               <Stack sx={{ p: 5 }} direction="row" justifyContent="space-between" alignItems="center">
         
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                     <Typography>
                        Total: <b>{searchCount}</b>
                     </Typography>

                     <Typography> {translate(locale, filterLocate.order_by)} </Typography>
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
                           {orderEstType.map((ele) => (
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
                           value={dataFilter.limit_page}
                           onChange={(e) =>
                              changeDataFilterDirectly({
                                 ...dataFilter,
                                 limit_page: e.target.value,
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
                     <Pagination count={5} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                  </Stack>
               </Stack>
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
                     {rows.map((row, index ) => (
                        <Fragment>
                           <TableRow key={row?.prd_img_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell>
                                 <Checkbox onClick={()=>handleChecked(row?.prd_img_code)} checked={(dataChecked.findIndex((ele) => ele === row?.prd_img_code)) !== -1 ? true : false}></Checkbox>
                              </TableCell>
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">
                                 <img style={{ width: 120 }} alt="" src={row?.prd_img_url} />
                              </TableCell>

                              <TableCell align="left">
                                 Tags : {row?.prd_img_tags}
                                 <br />
                                 Code : {row?.prd_img_code}
                                 <br />
                                 Name : {row?.prd_img_name}
                              </TableCell>
                              <TableCell align="center">
                                 <p>Created time: {row?.prd_img_create_time}</p>
                                 <p>-------------</p>
                                 <p>Update time: {row?.prd_img_mod_time}</p>
                              </TableCell>
                              <TableCell>
                                 <SwitchStatus status={row?.prd_img_status} handleChangeStatus={() => {}}></SwitchStatus>
                              </TableCell>
                              <TableCell>
                                 <MdOutlineModeEdit color="white" size={35} style={{ backgroundColor: "#F1C40F", padding: 5, cursor: "pointer" }} onClick={() => setCollapseData(row?.prd_img_code)} />
                              </TableCell>
                           </TableRow>
                           <TableRow sx={{ display: collapseData === row?.prd_img_code ? "table-row" : " none" }}>
                              <TableCell colSpan={8}>
                                 {" "}
                                 <ManagerImageEditWithoutBarcode row={row} closeCollapse={() => setCollapseData(null)}></ManagerImageEditWithoutBarcode>
                              </TableCell>
                           </TableRow>
                        </Fragment>
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
