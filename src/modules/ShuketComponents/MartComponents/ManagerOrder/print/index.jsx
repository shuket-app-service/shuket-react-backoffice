import { Box, Button, Card, CardContent, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { getOrdersPrint } from "../../../../store/managerOrder/thunk";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
const ManagerOrderPrint = () => {
   const navigate = useNavigate()
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();
   const [dataPrint, setDataPrint] = useState(null);
   const [searchParams] = useSearchParams();

   async function fetchData(params) {
      const response = await dispatch(getOrdersPrint(params));
      setDataPrint(response?.payload?.[0]); // data
      setLoading(false);
   }

   useEffect(() => {
      fetchData({ od_code: searchParams.get("orderlist_ids") });
      return () => {};
   }, []);
   const componentRef = React.useRef();
   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: `invoice-${new Date().toJSON().slice(0, 10)}`,
   });

   const gotoIndex = () =>{
      navigate("/marts/order/list")
   }

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            dataPrint && (
               <Card sx={{ borderRadius: 1, p: 5 }}>
                  <CardContent>
                     <Stack gap={2} direction={"row"} justifyContent={"space-between"}>
                        <Button variant="outlined" size="sm" onClick={handlePrint}>
                           Print
                        </Button>
                        <Button variant="outlined" size="sm" onClick={gotoIndex}>
                           Back
                        </Button>
                     </Stack>
                  </CardContent>
                  <Divider />
                  <Box ref={componentRef} sx={{ py: 2, px: 10 }}>
                     <Stack direction={"row"} gap={2} sx={{ mb: 3 }}>
                        <Stack direction={"row"} gap={2} sx={{ minWidth: 300 }}>
                           <Typography>*주문자 : </Typography>
                           <Typography sx={{ fontWeight: "bold" }}>{dataPrint?.od_reci_nm}</Typography>
                        </Stack>
                        <Stack direction={"row"} gap={2} sx={{ minWidth: 300 }}>
                           <Typography>*주문일 :</Typography>
                           <Typography sx={{ fontWeight: "bold" }}>{dataPrint?.od_date}</Typography>
                        </Stack>
                     </Stack>
                     <Stack direction={"row"} gap={2} sx={{ mb: 3 }}>
                        <Stack direction={"row"} gap={2} sx={{ minWidth: 300 }}>
                           <Typography>*주문번호 :</Typography>
                           <Typography sx={{ fontWeight: "bold" }}>{dataPrint?.od_code}</Typography>
                        </Stack>
                        <Stack direction={"row"} gap={2} sx={{ minWidth: 300 }}>
                           <Typography>*연락처 :</Typography>
                           <Typography sx={{ fontWeight: "bold" }}>{dataPrint?.od_reci_ph}</Typography>
                        </Stack>
                     </Stack>
                     <Stack direction={"row"} gap={2} sx={{ mb: 3 }}>
                        <Typography>*배송주소 :</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>{dataPrint?.od_full_addr}</Typography>
                     </Stack>
                     <Stack direction={"column"} gap={2} sx={{ mb: 3 }}>
                        <Typography>[메모]</Typography>
                        <TextField disabled sx={{ maxWidth: 600 }} size="small" InputProps={{ sx: { borderRadius: 0 } }}></TextField>
                     </Stack>

                     <Box sx={{ mb: 3 }}>
                        <Typography>[메모]</Typography>

                        <TableContainer component={Paper} sx={{ mt: 3 }}>
                           <Table sx={{ minWidth: 650 }}>
                              <TableHead>
                                 <TableCell align="center">NO</TableCell>
                                 <TableCell align="center">카테고리 </TableCell>
                                 <TableCell align="center">상품명 </TableCell>
                                 <TableCell align="center">규격</TableCell>
                                 <TableCell align="center">바코드</TableCell>
                                 <TableCell align="center">판매가</TableCell>
                                 <TableCell align="center">수량</TableCell>
                                 <TableCell align="center">출고가액</TableCell>
                              </TableHead>
                              <TableBody>
                                 {dataPrint?.od_detail_data?.map((row, index) => (
                                    <TableRow key={row?.ot_prd_barcd} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                       <TableCell align="center">{index + 1}</TableCell>
                                       <TableCell align="center">{row?.category} </TableCell>
                                       <TableCell align="center">{row?.ot_prd_nm} </TableCell>
                                       <TableCell align="center">{row?.ot_prd_unit} </TableCell>
                                       <TableCell align="center">
                                          <img src={`data:image/png;base64,${row?.ot_prd_barcd_img}`} style={{ width: 100 }} />
                                          <br />
                                          <Typography>{row?.ot_prd_barcd}</Typography>
                                       </TableCell>
                                       <TableCell align="center">{row?.ot_prd_all_list_price} </TableCell>
                                       <TableCell align="center">{row?.ot_prd_qty} </TableCell>
                                       <TableCell align="right">{row?.ot_prd_price} </TableCell>
                                    </TableRow>
                                 ))}
                                 <TableRow>
                                    <TableCell colSpan={6} align="center">
                                       소계
                                    </TableCell>
                                    <TableCell colSpan={2} align="right">
                                       {dataPrint?.od_detail_data.reduce((accumulator, currentValue) => accumulator + currentValue.ot_prd_price, 0)}
                                    </TableCell>
                                 </TableRow>
                                 <TableRow>
                                    <TableCell colSpan={6} align="center">
                                       쿠폰 할인{" "}
                                    </TableCell>
                                    <TableCell colSpan={2} align="right">
                                       -{dataPrint?.od_point_dc}
                                    </TableCell>
                                 </TableRow>
                                 <TableRow>
                                    <TableCell colSpan={6} align="center">
                                       배송비
                                    </TableCell>
                                    <TableCell colSpan={2} align="right">
                                       {dataPrint?.od_shipping}
                                    </TableCell>
                                 </TableRow>
                                 <TableRow>
                                    <TableCell colSpan={6} align="center">
                                       합계
                                    </TableCell>
                                    <TableCell colSpan={2} align="right">
                                       {parseInt(dataPrint?.od_detail_data.reduce((accumulator, currentValue) => accumulator + currentValue.ot_prd_price, 0) + dataPrint?.od_shipping)}
                                    </TableCell>
                                 </TableRow>
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                     <Box sx={{ mb: 3 }}>
                        <Typography>[결제정보]</Typography>
                        <TableContainer component={Paper} sx={{ mt: 3, width: 700 }}>
                           <Table sx={{ minWidth: 650 }}>
                              <TableHead>
                                 <TableCell align="center">결제 금액 </TableCell>
                                 <TableCell align="center">결제수단 </TableCell>
                                 <TableCell align="center">현금영수증 </TableCell>
                                 <TableCell align="center">지출증빙</TableCell>
                              </TableHead>
                              <TableBody>
                                 <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="center">{dataPrint?.od_bill_pr}</TableCell>
                                    <TableCell align="center">{dataPrint?.od_pay_txt}</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                 </TableRow>
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                     <Box sx={{ mb: 3 }}>
                        <Typography>[처리상태]</Typography>
                        <Typography sx={{ my: 5 }}>{dataPrint?.od_status_txt}</Typography>
                        <Divider />
                     </Box>
                     <Stack sx={{ mb: 3 }} gap={3}>
                        <Typography>[관리자 메모]</Typography>
                        <TextField disabled sx={{ maxWidth: 600 }} size="small" InputProps={{ sx: { borderRadius: 0 } }}></TextField>
                     </Stack>
                  </Box>
               </Card>
            )
         )}
      </>
   );
};

export default ManagerOrderPrint;
