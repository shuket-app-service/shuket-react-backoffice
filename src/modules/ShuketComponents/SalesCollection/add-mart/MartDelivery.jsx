import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, Select, Stack, Typography } from "@mui/material";
import React from "react";
import { paymentMethodType, paymentOnsiteType, pickupTime } from "../Helper/types";
import { translate } from "../../../../@crema/services/localization/translate";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const MartDelivery = ({ locale, values, setFieldValue, errors }) => {
   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>Order Delivery(*) </Typography>
                  <RadioGroup
                     defaultValue={values.set_delivery}
                     name="set_delivery"
                     onChange={(e) => {
                        setFieldValue("set_delivery", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     <FormControlLabel value="Y" control={<Radio />} label="Use" />
                     <FormControlLabel value="N" control={<Radio />} label="Not use" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>Order Pickup(*)</Typography>
                  <RadioGroup
                     defaultValue={values.store_set_hour}
                     name="store_set_hour"
                     onChange={(e) => {
                        setFieldValue("store_set_hour", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     <FormControlLabel value="Y" control={<Radio />} label="Use" />
                     <FormControlLabel value="N" control={<Radio />} label="Not use" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>Pickup COD(*) </Typography>
                  <RadioGroup
                     defaultValue={values.store_pk_cod}
                     name="store_pk_cod"
                     onChange={(e) => {
                        setFieldValue("store_pk_cod", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     <FormControlLabel value="Y" control={<Radio />} label="Use" />
                     <FormControlLabel value="N" control={<Radio />} label="Not use" />
                  </RadioGroup>
               </FormControl>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Interval time(*)</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select
                        size="small"
                        displayEmpty={true}
                        value={values.store_pick_time_interval}
                        onChange={(e) => {
                           setFieldValue("store_pick_time_interval", e.target.value);
                        }}
                     >
                        {pickupTime &&
                           pickupTime.map((ele) => (
                              <MenuItem key={ele.value} value={ele.value}>
                                 {translate(locale, ele.text)}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Business open hours(*)</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <TimePicker
                        name="store_set_hour_start"
                        defaultValue={dayjs(values.store_set_hour_start)}
                        onChange={(e) => {
                           setFieldValue("store_set_hour_start", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Business open hours(*)</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <TimePicker
                        name="store_set_hour_end"
                        defaultValue={dayjs(values.store_set_hour_end)}
                        onChange={(e) => {
                           setFieldValue("store_set_hour_end", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartDelivery;
