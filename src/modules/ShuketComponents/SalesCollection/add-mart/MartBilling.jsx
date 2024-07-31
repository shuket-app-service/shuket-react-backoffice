import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";
import { billingType, defaultSelect, discountPeriodDayType } from "../../Common/types";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getPartnerOption } from "../../../store/partner/thunk";
import { getSalesTeamOption } from "../../../store/main/thunk";

const MartBilling = ({ locale, values, setFieldValue, errors }) => {
   const [partnerType, setPartnerType] = useState([]);
   const [saleTeamType, setSaleTeamType] = useState([]);

   const dispatch = useDispatch();

   useEffect(() => {
      async function fetchData() {
         const partner = await dispatch(getPartnerOption());
         setPartnerType(partner.payload);
      }
      fetchData();
      return () => {};
   }, []);

   const handleChangePartner = async (partner_company) => {
    console.log(partner_company)
      if (!partner_company) {
         setSaleTeamType([]);
         return
      }
      const sales = await dispatch(getSalesTeamOption(partner_company));
      setSaleTeamType(sales.payload);
   };

   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>Payment method</Typography>
                  <RadioGroup
                     defaultValue={values.s_payment}
                     name="s_payment"
                     onChange={(e) => {
                        setFieldValue("s_payment", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     {billingType.map((ele) => (
                        <FormControlLabel key={ele.value} value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                     ))}
                  </RadioGroup>
               </FormControl>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Discount(KRW) </Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="s_discount"
                        id="s_discount"
                        value={values.s_discount}
                        onChange={(e) => {
                           setFieldValue("s_discount", e.target.value);
                           setErrorCheckID(null);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Discount period(Days) </Typography>
                  <FormControl sx={{ m: 1, width: 200 }}>
                     <Select
                        size="small"
                        displayEmpty={true}
                        value={values.s_discount_period}
                        onChange={(e) => {
                           setFieldValue("s_discount_period", e.target.value);
                        }}
                     >
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {discountPeriodDayType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Service start date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        name="s_date_service"
                        defaultValue={dayjs(values.s_date_service)}
                        onChange={(e) => {
                           setFieldValue("s_date_service", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Billing start date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        name="s_date_billing"
                        defaultValue={dayjs(values.s_date_billing)}
                        onChange={(e) => {
                           setFieldValue("s_date_billing", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Partner company</Typography>
                  <FormControl sx={{ m: 1, width: 200 }}>
                     <Select
                        size="small"
                        displayEmpty={true}
                        value={values.partner_company}
                        onChange={(e) => {
                           setFieldValue("partner_company", e.target.value);
                           setFieldValue("spt_code", "");
                           handleChangePartner(e.target.value);
                        }}
                     >
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {partnerType &&
                           partnerType.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Partner company</Typography>
                  <FormControl sx={{ m: 1, width: 200 }}>
                     <Select
                        size="small"
                        displayEmpty={true}
                        value={values.spt_code}
                        onChange={(e) => {
                           setFieldValue("spt_code", e.target.value);
                        }}
                     >
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {saleTeamType &&
                           saleTeamType.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {ele.name}
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

export default MartBilling;
