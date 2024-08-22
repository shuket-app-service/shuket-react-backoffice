import { Box, Button, Card, CardContent, CardHeader, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { translate } from "../../../../../@crema/services/localization/translate";
import { indexLocate } from "../helper/locate";
import { useLocation, useNavigate } from "react-router-dom";
import { getAppScreenDetail } from "../../../../store/appDisplay/thunk";
import { useDispatch } from "react-redux";
import AppDisplayEditTable from "./AppDisplayEditTable";
import AppDisplayEditScreen from "./AppDisplayEditScreen";
import AppLoader from "@crema/components/AppLoader";
import headerAppImg from "../images/header_app.png";
import footerAppImg from "../images/footer_app.png";
import AppDisplayAdd from "../add";
import BackdropLoad from "../../../Common/BackdropLoad";
import Type1 from "../add/template/Type1";
import Type24 from "../add/template/Type24";
import Type32 from "../add/template/Type32";
import Type38 from "../add/template/Type38";

const AppDisplayEdit = () => {
   const { locale } = useLocaleContext();

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const sc_code = queryParams.get("sc_code");

   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   const [backdropLoading, setBackdropLoading] = useState(false);

   const [detail, setDetail] = useState(null);
   const [openAdd, setOpenAdd] = useState(false);
   const [openAddTemplate, setOpenAddTemplate] = useState(false);
   const [chooseTemplate, setChooseTemplate] = useState(null);

   useEffect(() => {
      dispatch(getAppScreenDetail(sc_code))
         .then((res) => {
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

   const handleOpenAdd = () => {
      setBackdropLoading(true);
      setOpenAdd(true);
   };
   const handleCloseAdd = () => {
      setOpenAdd(false);
   };

   const handleStopLoading = () => {
      setBackdropLoading(false);
   };

   const HandleChooseTemplate = (code) => {
      setChooseTemplate(code);
   };

   const handleOpenTemplate = () => {
      setOpenAddTemplate(true);
      setOpenAdd(false);
      console.log(chooseTemplate);
   };
   const handleCloseTemplate = () => {
      setOpenAddTemplate(false);
      setOpenAdd(false);
      setChooseTemplate(null);
   };
   return (
      <>
         {" "}
         {loading ? (
            <AppLoader />
         ) : (
            <Card sx={{ borderRadius: 0 }}>
               {backdropLoading && <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>}
               {/* list type */}
               <Type1 open={chooseTemplate == 1 && openAddTemplate} handleCloseTemplate={handleCloseTemplate} sc_code={sc_code} locale={locale}></Type1>
               <Type24 open={chooseTemplate == 24 && openAddTemplate} handleCloseTemplate={handleCloseTemplate} sc_code={sc_code} locale={locale}></Type24>
               <Type32 open={chooseTemplate == 32 && openAddTemplate} handleCloseTemplate={handleCloseTemplate} sc_code={sc_code} locale={locale}></Type32>
               <Type38 open={chooseTemplate == 38 && openAddTemplate} handleCloseTemplate={handleCloseTemplate} sc_code={sc_code} locale={locale}></Type38>

               <AppDisplayAdd
                  openAdd={openAdd}
                  handleCloseAdd={handleCloseAdd}
                  HandleChooseTemplate={HandleChooseTemplate}
                  handleOpenTemplate={handleOpenTemplate}
                  backdropLoading={backdropLoading}
                  handleStopLoading={handleStopLoading}
                  locale={locale}
               />

               <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
                  <Typography>{translate(locale, indexLocate.titleEdit)} </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                     <Button type="button" color="primary" variant="contained" onClick={handleOpenAdd}>
                        {translate(locale, indexLocate.btnAdd)}
                     </Button>
                     <Button type="button" color="primary" variant="outlined" onClick={gotoIndex}>
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
                           <Typography sx={{ fontWeight: "bold", fontSize: 20, textDecorationLine: "underline", textDecorationColor: "#68BCB5" }}>{detail?.sc_label}</Typography>
                           <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>배너전시</Typography>
                           <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>쿠폰</Typography>
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
