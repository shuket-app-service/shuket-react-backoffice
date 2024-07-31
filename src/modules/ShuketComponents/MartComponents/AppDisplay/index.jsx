import { Button, Card, CardContent, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import { useDispatch } from "react-redux";
import AppLoader from "@crema/components/AppLoader";
import { getScreenBuilder, saveSortScreen, updateAppScreenStatus } from "../../../store/appBuilder/thunk";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { translate } from "../../../../@crema/services/localization/translate";
import { indexLocate } from "./helper/locate";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AppDisplay = () => {
   const [loading, setLoading] = useState(false);
   const [mainMenu, setMainMenu] = useState([]);
   const [subMenu, setSubMenu] = useState([]);
   const { locale } = useLocaleContext();
   const navigate = useNavigate();

   const dispatch = useDispatch();

   async function fetchData() {
      setLoading(true)
      const res = await dispatch(getScreenBuilder());
      setMainMenu(res.payload.ms_list_data);
      setSubMenu(res.payload.ss_list_data);
      setLoading(false);
   }

   useEffect(() => {
      fetchData();
      return () => {};
   }, []);
   
   const handleChangeStatus = async (scCode, scStatus) =>{
      setLoading(true);
      await dispatch(updateAppScreenStatus({ sc_code: scCode, sc_status: scStatus == "A" ? "C" : "A"}))
      .then(async ()=>{
         const res = await dispatch(getScreenBuilder());
         setMainMenu(res.payload.ms_list_data);
         setSubMenu(res.payload.ss_list_data);
         setLoading(false);
      })
      .catch(()=>{
         setLoading(false);
      })
   }

   const handleSaveSortPosition = async () =>{
      console.log(mainMenu)
      await dispatch(saveSortScreen(mainMenu))
      .then(async ()=>{
         const res = await dispatch(getScreenBuilder());
         setMainMenu(res.payload.ms_list_data);
         setSubMenu(res.payload.ss_list_data);
          toast.success(translate(locale, indexLocate.alertSavePosition))
         setLoading(false);
      })
      .catch(()=>{
         setLoading(false);

      })
   }

   const handleChangeSortPosition = (scCode, value) =>{
      const updatedMenu = mainMenu.map(ele =>
         ele.sc_code === scCode ? { ...ele, sort_option: parseInt(value) } : ele
       );
       setMainMenu(updatedMenu);
   }

   const gotoAdd = () =>{
      navigate("action?type=add")
   }

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Paper>
               <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
                  <Typography>{translate(locale, indexLocate.title)} </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Button type="button" color="primary" variant="outlined" onClick={handleSaveSortPosition}>
                        {translate(locale, indexLocate.btnPosition)}
                     </Button>
                     <Button type="button" color="primary" variant="outlined" onClick={gotoAdd}>
                        {translate(locale, indexLocate.btnAdd)}
                     </Button>
                  </Stack>
               </Stack>
               <Divider/>
               <MainMenu locale={locale} mainMenu={mainMenu} handleChangeStatus={handleChangeStatus} handleChangeSortPosition={handleChangeSortPosition}></MainMenu>
               <SubMenu locale={locale} subMenu={subMenu}></SubMenu>
            </Paper>
         )}
      </>
   );
};

export default AppDisplay;
