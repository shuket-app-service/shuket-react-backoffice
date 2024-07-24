import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFcmOptions } from "../../../store/salesCollection/thunk";
import { FormControl, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";

const MartAppSetting = ({ locale, values, setFieldValue, errors }) => {
   const dispatch = useDispatch();
   const [fcmType, setFcmType] = useState([]);

   useEffect(() => {
      async function fetchData() {
         const fcm = await dispatch(getFcmOptions());
         setFcmType(fcm.payload);
      }
      fetchData();
      return () => {};
   }, []);

   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Android FCM key</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.push_key_android} onChange={(e) => setFieldValue("push_key_android", e.target.value)}>
                        {fcmType &&
                           fcmType.map((ele) => (
                              <MenuItem key={ele.fcm_code} value={ele.fcm_code}>
                                 {ele.fcm_name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>IOS FCM key</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.push_key_ios} onChange={(e) => setFieldValue("push_key_ios", e.target.value)}>
                        {fcmType &&
                           fcmType.map((ele) => (
                              <MenuItem key={ele.fcm_code} value={ele.fcm_code}>
                                 {ele.fcm_name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartAppSetting;
