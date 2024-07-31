import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import React from "react";
import { paymentMethodType, paymentOnsiteType } from "../Helper/types";
import { translate } from "../../../../@crema/services/localization/translate";

const MartPayment = ({ locale, values, setFieldValue, errors }) => {
   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>Online Payment</Typography>
                  <RadioGroup
                     defaultValue={values.mart_pm_crc}
                     name="mart_pm_crc"
                     onChange={(e) => {
                        setFieldValue("mart_pm_crc", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     <FormControlLabel value="Y" control={<Radio />} label="Use" />
                     <FormControlLabel value="N" control={<Radio />} label="Not use" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={4}></Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={12}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Method</Typography>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                     {paymentMethodType.map((ele) => (
                        <FormControlLabel
                           control={<Checkbox defaultChecked={ele.value === values.op_payment} onChange={(e) => setFieldValue("op_payment", e.target.checked)} />}
                           label={`${translate(locale, ele.text)}`}
                        />
                     ))}
                  </FormGroup>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={12}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>COD, CCOD </Typography>
                  <RadioGroup
                     defaultValue={values.mart_pm_xod}
                     name="mart_pm_xod"
                     onChange={(e) => {
                        setFieldValue("mart_pm_xod", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     <FormControlLabel value="Y" control={<Radio  />} label="Use" />
                     <FormControlLabel value="N" control={<Radio />} label="Not use" />
                  </RadioGroup>
               </FormControl>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={12}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Method</Typography>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                     {paymentOnsiteType.map((ele) => (
                        <FormControlLabel
                           control={<Checkbox defaultChecked={ele.value === values.op_payment} onChange={(e) => setFieldValue("op_payment", e.target.checked)} />}
                           label={`${translate(locale, ele.text)}`}
                        />
                     ))}
                  </FormGroup>
               </Stack>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartPayment;
