import { Box, Button, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { translate } from "@crema/services/localization/translate";
import { filterLocateInfo } from "../helper/locate";
import ManagerOrderCart from "./ManagerOrderCart";

const ManagerOrderInfo = ({ dataDetail, locale }) => {
   const theme = useTheme();
   return (
      <Box>
         <Stack useFlexGap flexWrap="wrap" gap={5} direction={"row"} justifyContent={"center"}>
            <Card sx={{ borderRadius: 0, width: "49%" }}>
               <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.paymentDetail)}></CardHeader>
               <CardContent>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentMethod)}</Typography>
                     <Typography>{dataDetail?.od_pay_txt}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentDate)}</Typography>
                     <Typography>{dataDetail?.od_pay_date}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentPrice)}</Typography>
                     <Typography>{dataDetail?.od_total_pr}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentDelivery)}</Typography>
                     <Typography>+ {dataDetail?.od_shipping}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentPoint)}</Typography>
                     <Typography>- {dataDetail?.od_point_dc}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentPoint)}</Typography>
                     <Typography>- {dataDetail?.od_coupon_dc}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentTotal)}</Typography>
                     <Typography>- {dataDetail?.od_bill_pr}</Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentAccumulate)}</Typography>
                     <Typography></Typography>
                  </Stack>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.paymentCard)}</Typography>
                     <Typography>{dataDetail?.od_pay_card_name}</Typography>
                  </Stack>
               </CardContent>
            </Card>
            <Stack sx={{ width: "49%" }} gap={5}>
               <Card sx={{ borderRadius: 0 }}>
                  <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.customerInfo)}></CardHeader>
                  <CardContent>
                     <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                        <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.customerName)}</Typography>
                        <Typography>{dataDetail?.od_orderer_nm}</Typography>
                     </Stack>
                     <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                        <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.customerPhone)}</Typography>
                        <Typography>{dataDetail?.od_orderer_ph}</Typography>
                     </Stack>
                  </CardContent>
               </Card>
               <Card sx={{ borderRadius: 0, minHeight: 265 }}>
                  <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.shipingInfo)}></CardHeader>
                  <CardContent>
                     <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                        <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.shipingName)}</Typography>
                        <Typography>{dataDetail?.od_reci_nm}</Typography>
                     </Stack>
                     <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                        <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.shipingPhone)}</Typography>
                        <Typography>
                           {dataDetail?.od_reci_ph} ({dataDetail?.od_reci_ph_ex})
                        </Typography>
                     </Stack>
                     <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                        <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.shipingAddress)}</Typography>
                        <Typography>
                           {dataDetail?.od_str_address}
                           <br />
                           (Zip code: {dataDetail?.od_reci_post_cd})
                        </Typography>
                     </Stack>
                  </CardContent>
               </Card>
            </Stack>
         </Stack>
         <Stack useFlexGap flexWrap="wrap" gap={5} direction={"row"} justifyContent={"center"} sx={{ mt: 5 }}>
            <Card sx={{ borderRadius: 0, width: "49%" }}>
               <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.status)}></CardHeader>
               <CardContent>
                  <Stack gap={5} direction={"row"} sx={{ mb: 5 }} alignItems={"center"}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.statusLog)}</Typography>
                     <Typography>{dataDetail?.od_status_txt}</Typography>
                     <Button size="small" variant="outlined">
                        {translate(locale, filterLocateInfo.statusLog)}
                     </Button>
                  </Stack>
               </CardContent>
            </Card>
            <Stack sx={{ width: "49%" }} gap={5}>
               <Card sx={{ borderRadius: 0 }}>
                  <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.CustomerNotice)}></CardHeader>
                  <CardContent></CardContent>
               </Card>
               <Card sx={{ borderRadius: 0 }}>
                  <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.deliveryInfo)}></CardHeader>
                  <CardContent>
                     <Stack gap={5} direction={"row"} sx={{ mb: 5 }}>
                        <Typography sx={{ minWidth: 200 }}>{translate(locale, filterLocateInfo.deliveryNote)}</Typography>
                        <Typography>{dataDetail?.delivery_text}</Typography>
                     </Stack>
                  </CardContent>
               </Card>
            </Stack>
         </Stack>
         <Card sx={{ borderRadius: 0, mt:5 }}>
                  <CardHeader sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }} title={translate(locale, filterLocateInfo.CustomerNotice)}></CardHeader>
                  <CardContent>
                     <ManagerOrderCart rows={dataDetail?.od_detail_data} locale={locale}></ManagerOrderCart>
                  </CardContent>
               </Card>
      </Box>
   );
};

export default ManagerOrderInfo;
