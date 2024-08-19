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
   FormGroup,
   MenuItem,
   Pagination,
   Radio,
   RadioGroup,
   Select,
   Stack,
   styled,
   Switch,
   TableFooter,
   TablePagination,
   TextField,
   Tooltip,
   Typography,
} from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { filterLocate, headersLocate } from "./helper/locate";
import { limitType, timeTypes } from "./helper/types";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import ManagerOrderTableCancel from "./ManagerOrderTableCancel";

export default function ManagerOrderTableGroup({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   const navigate = useNavigate();
   const [dataChecked, setDataChecked] = useState([]);
   const [dataTime, setDataTime] = useState(null);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocate.kr);
      } else {
         setHeaders(headersLocate.en);
      }
   }, [locale]);

   const gotoDetail = (code) => {
      navigate(`/marts/order/detail?ord_code=${code}&mart_code=${dataFilter.search_mart}`);
   };

   const gotoPrint = (code) => {
      navigate(`/marts/order/print?orderlist_ids=${code}`);
   };

   const handleClickAll = () => {
      if (!dataChecked.length) {
         const data = rows.map((r) => r?.od_code);
         setDataChecked(data);
      } else {
         if (dataChecked.length === rows.length) {
            setDataChecked([]);
         } else {
            const data = rows.map((r) => r?.od_code);
            setDataChecked(data);
         }
      }
   };
   const handleChecked = (code) => {
      if (dataChecked.findIndex((ele) => ele === code) == -1) {
         setDataChecked([...dataChecked, code]);
      } else {
         let temp = dataChecked.filter((ele) => ele !== code);
         setDataChecked(temp);
      }
   };

   const handleSetTime = (code, time, customTime) => {
      if (dataTime) {
         if (dataTime?.od_code === code) {
            setDataTime(null);
         } else {
            setDataTime({ od_code: code, time: time, customTime: customTime });
         }
      } else {
         setDataTime({ od_code: code, time: time, customTime: customTime });
      }
   };

   console.log(dataTime);
   return (
      <>
         <Box>
            <Card sx={{ borderRadius: 0 }}>
               <CardContent>
                  <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                     <Stack direction="row" alignItems={"center"} gap={5}>
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
                        <FormGroup>
                           <FormControlLabel
                              control={
                                 <Switch
                                    defaultChecked={dataFilter.sort_by_area}
                                    onChange={(e) =>
                                       changeDataFilterDirectly({
                                          ...dataFilter,
                                          sort_by_area: e.target.checked,
                                          page: 1,
                                       })
                                    }
                                 />
                              }
                              label={translate(locale, filterLocate.sortAddress)}
                           />
                        </FormGroup>
                     </Stack>

                     <Pagination count={pageCount} page={dataFilter.page} siblingCount={0} boundaryCount={1} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                  </Stack>
               </CardContent>
            </Card>
            <TableContainer component={Paper}>
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
                     {Object.entries(rows).map(([key, value]) => (
                        <>
                           <TableRow key={key}>
                              <TableCell colSpan={16}>
                                 <Typography sx={{ fontWeight: "bold" }} variant="h5">
                                    {value?.name_address}({value?.count_total})
                                 </Typography>
                              </TableCell>
                           </TableRow>

                           {value.data_order_group?.map((row, index) => (
                              <>
                                 <TableRow key={row?.od_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell>
                                       <Checkbox onClick={() => handleChecked(row?.od_code)} checked={dataChecked.findIndex((ele) => ele === row?.od_code) !== -1 ? true : false}></Checkbox>
                                    </TableCell>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center" sx={{ minWidth: 150 }}>
                                       {row?.od_code}
                                       <Divider sx={{ my: 1 }} />
                                       <Button size="small" sx={{ mt: 1 }} variant="outlined" onClick={() => gotoDetail(row?.od_code)}>
                                          {translate(locale, filterLocate.btnCart)}
                                       </Button>
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 180 }}>
                                       {row?.od_date}
                                       <Divider sx={{ my: 1 }} />
                                       {"data" in row?.data_sub_cancel ? (
                                          <Typography sx={{ color: "red" }}>{translate(locale, filterLocate.time)}</Typography>
                                       ) : row?.pu_show_time_display ? (
                                          <Tooltip title={row?.pu_show_time_display} placement="top" onClick={() => handleSetTime(row?.od_code, row?.pu_set_time, row?.pu_custom_set_time)}>
                                             <Typography sx={{ color: "green", fontWeight: "bold", cursor: "pointer" }}>{row?.pu_show_time_display}</Typography>
                                          </Tooltip>
                                       ) : (
                                          <Button size="small" sx={{ mt: 1 }} variant="outlined" onClick={() => handleSetTime(row?.od_code, row?.pu_set_time, row?.pu_custom_set_time)}>
                                             {" "}
                                             {translate(locale, filterLocate.btnTime)}
                                          </Button>
                                       )}
                                    </TableCell>
                                    <TableCell align="center">{row?.od_customer}</TableCell>
                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                       {row?.od_address}{" "}
                                    </TableCell>
                                    <TableCell align="center">{row?.od_goods_cnt} </TableCell>
                                    <TableCell align="center">
                                       <CurrencyFormat value={row?.od_total_pr} displayType={"text"} thousandSeparator={true}></CurrencyFormat>
                                    </TableCell>
                                    <TableCell align="center">
                                       <CurrencyFormat value={row?.od_shipping} displayType={"text"} thousandSeparator={true}></CurrencyFormat>
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 200 }}>
                                       {row?.delivery_text}{" "}
                                    </TableCell>
                                    <TableCell align="center">{row?.od_coupon_dc} </TableCell>
                                    <TableCell align="center">{row?.od_point_dc} </TableCell>
                                    <TableCell align="center">{row?.od_bill_pr} </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 150 }}>
                                       {row?.od_pay_txt}{" "}
                                    </TableCell>
                                    <TableCell align="center" sx={{ minWidth: 150 }}>
                                       <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                          <div style={{ width: 25, backgroundColor: row?.od_cl_box }}>{""}</div>
                                          <p style={{ color: row?.od_cl_text }}> {row?.od_status_txt}</p>
                                       </Stack>
                                    </TableCell>

                                    <TableCell align="center">
                                       <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                          <Button variant="outlined" size="small" onClick={() => gotoDetail(row?.od_code)}>
                                             {translate(locale, filterLocate.btnView)}
                                          </Button>
                                          <Button variant="outlined" color="warning" size="small" onClick={() => gotoPrint(row?.od_code)}>
                                             {translate(locale, filterLocate.btnPrint)}
                                          </Button>
                                       </Stack>
                                    </TableCell>
                                 </TableRow>
                                 {"data" in row?.data_sub_cancel && (
                                    <TableRow>
                                       <TableCell align="center" colSpan={16}>
                                          <ManagerOrderTableCancel rows={row?.data_sub_cancel?.data} locale={locale} />
                                       </TableCell>
                                    </TableRow>
                                 )}
                                 {dataTime && row?.od_code === dataTime?.od_code && (
                                    <TableRow key={dataTime?.od_code}>
                                       <TableCell colSpan={16}>
                                          <Stack gap={5} direction={"row"} sx={{ px: 35 }} alignItems={"center"}>
                                             <Typography>{translate(locale, filterLocate.selectTime)}</Typography>
                                             <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={dataTime?.time}>
                                                {timeTypes?.map((time, indexTime) => (
                                                   <FormControlLabel value={time.value} control={<Radio />} label={translate(locale, time.text)} />
                                                ))}
                                             </RadioGroup>
                                             <Typography>{translate(locale, filterLocate.customTime)}</Typography>
                                             <TextField type="number" size="small" defaultValue={dataTime?.customTime} />
                                          </Stack>
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </>
                           ))}
                        </>
                     ))}
                  </TableBody>
               </Table>
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
