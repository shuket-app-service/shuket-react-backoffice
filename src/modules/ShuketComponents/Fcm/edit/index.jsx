import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterLocateEdit } from "../helper/locate";
import { translate } from "../../../../@crema/services/localization/translate";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { useNavigate } from "react-router-dom";
import { UseParams } from "../../../../@crema/hooks/useParams";
import { useDispatch } from "react-redux";
import { getFcmDetail } from "../../../store/fcm/thunk";
import AppLoader from "@crema/components/AppLoader";

const FcmEdit = () => {
   const { locale } = useLocaleContext();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(true);
   const [dataEdit, setDataEdit] = useState(null);

   const gotoBack = () => {
      navigate("/service/fcm-management");
   };

   async function fetchData() {
      const fcmCode = UseParams("fcm_code");
      const response = await dispatch(getFcmDetail(fcmCode));
      console.log(response);

      setDataEdit(response.payload);
      setLoading(false);
   }

   useEffect(() => {
      fetchData();
      return () => {};
   }, []);

   return (
      <>
         {loading || !dataEdit ? (
            <AppLoader />
         ) : (
            <Box>
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography>{translate(locale, filterLocateEdit.title)}</Typography>
                        <Button variant="outlined" onClick={gotoBack}>
                           {" "}
                           {translate(locale, filterLocateEdit.btnBack)}
                        </Button>
                     </Stack>
                     <Divider sx={{ my: 5 }} />
                     <Box sx={{ px: 30 }}>
                        <Stack direction="row" alignItems="center" gap={5} sx={{ my: 5 }}>
                           <Typography sx={{ width: 150 }}>{translate(locale, filterLocateEdit.fcmName)} </Typography>
                           <Box>
                              <TextField sx={{ width: 500 }} size="small" type="text" defaultValue={dataEdit?.fcm_name} />
                           </Box>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={5} sx={{ my: 5 }}>
                           <Typography sx={{ width: 150 }}>{translate(locale, filterLocateEdit.fcmKey)} </Typography>
                           <Box>
                              <TextField sx={{ width: 500 }} size="small" type="text" defaultValue={dataEdit?.fcm_key} />
                           </Box>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={5}>
                           <Typography sx={{ width: 150 }}>{translate(locale, filterLocateEdit.fcmJson)} </Typography>
                           <Box>
                              <TextField sx={{ width: 500 }} size="small" type="text" defaultValue={dataEdit?.fcm_key} />
                           </Box>
                           <TextField type="file" size="small"></TextField>
                        </Stack>
                     </Box>

                     <Box sx={{ mt: 10 }}>
                        <Button variant="contained" sx={{ display: "block", margin: "auto" }}>
                           {translate(locale, filterLocateEdit.btnSave)}
                        </Button>
                     </Box>
                  </CardContent>
               </Card>
            </Box>
         )}
      </>
   );
};

export default FcmEdit;
