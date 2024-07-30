import { Box, Button, Card, CardContent, CardHeader, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { translate } from "../../../../../@crema/services/localization/translate";
import { indexLocate } from "../locate";
import { useLocation, useNavigate } from "react-router-dom";
import { getAppScreenDetail } from "../../../../store/appBuilder/thunk";
import { useDispatch } from "react-redux";
import AppDisplayEditTable from "./AppDisplayEditTable";
import AppDisplayEditScreen from "./AppDisplayEditScreen";
import AppLoader from "@crema/components/AppLoader";
import headerAppImg from "../images/header_app.png";
import footerAppImg from "../images/footer_app.png";

const AppDisplayEdit = () => {
   const { locale } = useLocaleContext();

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const sc_code = queryParams.get("sc_code");

   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   const [detail, setDetail] = useState(null);

   useEffect(() => {
      dispatch(getAppScreenDetail(sc_code))
         .then((res) => {
            console.log(res);
            setDetail(res.payload);
         })
         .catch((err) => {})
         .finally(() => {
            setLoading(false);
         });
   }, []);

   const navigate = useNavigate();
   const gotoIndex = () => {
      navigate("/app-management/app-builder");
   };
   return (
      <>
         {" "}
         {loading ? (
            <AppLoader />
         ) : (
            <Card sx={{ borderRadius: 0 }}>
               <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
                  <Typography>{translate(locale, indexLocate.titleEdit)} </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                     <Button type="button" color="primary" variant="contained" onClick={gotoIndex}>
                        {translate(locale, indexLocate.btnBack)}
                     </Button>
                  </Stack>
               </Stack>
               <Divider />
               <CardContent sx={{ mt: 5 }}>
                  <Stack sx={{ width: 400 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                     <Typography>{translate(locale, indexLocate.nameTemplate)} </Typography>
                     <TextField type="text" value={detail?.sc_label} onChange={(e) => setDetail({ ...detail, sc_label: e.target.value })}></TextField>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 10 }}>
                     <Paper elevation={4} sx={{ width: "30%" }}>
                        <img alt="" src={headerAppImg} />
                        <Stack gap={5} direction="row" sx={{ px: 5 }}>
                           <Typography sx={{ fontWeight: "bold", fontSize:20, textDecorationLine:"underline", textDecorationColor:"#68BCB5" }}>{detail?.sc_label}</Typography>
                           <Typography sx={{ fontWeight: "bold", fontSize:20 }}>배너전시</Typography>
                           <Typography sx={{ fontWeight: "bold", fontSize:20 }}>쿠폰</Typography>
                        </Stack>
                        <Stack gap={5} sx={{ p: 5 }}>
                           {detail?.sc_detail_data.map((dt) => {
                              return <AppDisplayEditScreen detail={dt}></AppDisplayEditScreen>;
                           })}
                        </Stack>
                        <img alt="" src={footerAppImg} />
                     </Paper>
                     <Paper elevation={4} sx={{ p: 5, width: "70%" }}>
                        <AppDisplayEditTable locale={locale} detail={detail} handleDragEndCallback={(e) => setDetail({ ...detail, sc_detail_data: e })}></AppDisplayEditTable>
                     </Paper>{" "}
                  </Stack>
               </CardContent>
            </Card>
         )}
      </>
   );
};

export default AppDisplayEdit;
