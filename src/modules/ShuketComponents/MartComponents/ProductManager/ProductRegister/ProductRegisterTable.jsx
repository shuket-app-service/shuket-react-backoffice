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
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import SwitchStatus from "../../../Common/SwitchStatus";
import { RiSubtractFill } from "react-icons/ri";
import { HiOutlinePlusSm } from "react-icons/hi";

export default function ProductRegisterTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, handleSetDetail, handleEditMinMax, locale }) {
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
                           <FormControlLabel
                              control={<Checkbox defaultChecked={dataFilter.product_only_brgn} onChange={(e) => changeDataFilterDirectly({ ...dataFilter, product_only_brgn: e.target.checked })} />}
                              label={translate(locale, filterLocate.titleBrgn)}
                           />
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
                           <TableCell align="left" sx={{ minWidth: 150 }}>
                              <img src={row?.images?.[0]?.thumb} style={{ width: "100%", cursor: "pointer" }} onClick={() => handleSetDetail(row)} />
                           </TableCell>
                           <TableCell align="left" sx={{ maxWidth: 220 }}>
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
                                 <small> {row?.tags}</small>
                              </Typography>
                           </TableCell>
                           <TableCell align="center" sx={{ minWidth: 150 }}>
                              <Typography>{row?.sale_price ? <s style={{ color: "gray" }}>{row?.list_price} 원</s> : <p>{row?.list_price} 원</p>}</Typography>
                              {row?.sale_price && (
                                 <Typography>
                                    {row?.sale_price} 원 <b style={{ color: "red" }}> {((row?.sale_price / row?.list_price) * 10).toFixed(0)}%</b>
                                 </Typography>
                              )}

                              {row?.sale_price && <Typography>({row?.sale_src})</Typography>}
                              {row?.sale_price && <Typography>({row?.sale_title})</Typography>}

                              {row?.price_updown === "U" ? (
                                 <div style={{ color: "green", backgroundColor: "#DCF2F1", padding: 2 }}>
                                    <Typography>{row?.price_show} 원</Typography>
                                    <Typography>
                                       <IoMdArrowUp />
                                       {row?.price_number} {row?.price_type === "PC" ? "%" : row?.price_type === "AM" ? "원" : ""}
                                    </Typography>
                                 </div>
                              ) : row?.price_updown === "D" ? (
                                 <div style={{ color: "red", backgroundColor: "#DCF2F1", padding: 2 }}>
                                    <Typography>{row?.price_show} 원</Typography>
                                    <Typography>
                                       <IoMdArrowDown />
                                       {row?.price_number} {row?.price_type === "PC" ? "%" : row?.price_type === "AM" ? "원" : ""}
                                    </Typography>
                                 </div>
                              ) : null}
                           </TableCell>
                           <TableCell align="center">
                              <Typography align="center">{row?.is_pro_stock ? row?.value_stock : "--"}</Typography>
                              <Typography sx={{ color: "red" }} align="center">
                                 {row?.is_pro_stock && row?.min_stock >= row?.value_stock ? "OUT OF STOCK" : ""}
                              </Typography>
                           </TableCell>
                           <TableCell align="center" sx={{ minWidth: 150 }}>
                              <Typography>{row?.date_sync_stock}</Typography>
                              <Typography>{row?.time_sync_stock ? row?.time_sync_stock : "--"}</Typography>
                           </TableCell>
                           <TableCell align="center">
                              <Stack gap={2} direction={"column"} alignItems={"center"}>
                                 <Stack gap={2} direction={"row"} alignItems={"center"}>
                                    <IconButton>
                                       <RiSubtractFill />
                                    </IconButton>
                                    <Typography>{row?.min_stock}</Typography>
                                    <IconButton>
                                       <HiOutlinePlusSm />
                                    </IconButton>
                                 </Stack>
                                 <SwitchStatus status={row?.is_pro_stock} handleChangeStatus={() => {}}></SwitchStatus>
                              </Stack>
                           </TableCell>
                           <TableCell align="center" sx={{ minWidth: 160 }}>
                              <Typography>
                                 <text style={{ color: "#3A80D7" }}>{translate(locale, tableLocate.isMax)}</text> {row?.is_pro_maxqty}
                              </Typography>
                              {row?.is_pro_maxqty === "Y" && (
                                 <Typography>
                                    <text style={{ color: "#3A80D7" }}>{translate(locale, tableLocate.valueMax)}</text> {row?.pro_max_qty}
                                 </Typography>
                              )}

                              <Typography>
                                 <text style={{ color: "#3A80D7" }}>{translate(locale, tableLocate.isMin)}</text> {row?.is_pro_minqty}
                              </Typography>
                              {row?.is_pro_minqty === "Y" && (
                                 <Typography>
                                    {" "}
                                    <text style={{ color: "#3A80D7" }}>{translate(locale, tableLocate.valueMin)}</text>
                                    {row?.pro_min_qty}
                                 </Typography>
                              )}

                              <Button variant="outlined" size="small" sx={{ mt: 2 }} onClick={() => handleEditMinMax(row)}>
                                 Edit Min/Max
                              </Button>
                           </TableCell>
                           <TableCell align="center" sx={{ minWidth: 150 }}>
                              <Typography> {row?.create_time}</Typography>
                              <small>
                                 {" "}
                                 ({translate(locale, tableLocate.createBy)} {row?.create_name} )
                              </small>
                              <Divider sx={{ my: 2 }} />
                              <Typography>{row?.update_time}</Typography>
                              <small>
                                 ( {translate(locale, tableLocate.updateBy)}
                                 {row?.update_name})
                              </small>
                           </TableCell>

                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <Button variant="outlined" color="warning">
                                    {" "}
                                    {translate(locale, filterLocate.btnEdit)}
                                 </Button>
                                 <Button variant="outlined" color="error">
                                    {" "}
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
