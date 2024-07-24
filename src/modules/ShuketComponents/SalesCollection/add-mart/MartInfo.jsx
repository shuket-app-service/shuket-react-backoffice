import { Box, Button, Card, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { appType, businessMartType, businessType, commomMartType, defaultSelect, martDisplayStatus, posType } from "../../Helper/types";
import { translate } from "../../../../@crema/services/localization/translate";
import { useDispatch } from "react-redux";
import { getCityOptions, getDistrictOptions } from "../../../store/main/thunk";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TextValidate from "../../Common/TextValidate";

const MartInfo = ({ locale, values, setFieldValue, errors }) => {
   const [cityType, setCityType] = useState([]);
   const [districtType, setDistrictType] = useState([]);
   const [martLogoPreview, setMartLogoPreview] = useState(null);
   const [martLogoPushPreview, setMartLogoPushPreview] = useState(null);

   const dispatch = useDispatch();

   useEffect(() => {
      async function fetchData() {
         const city = await dispatch(getCityOptions());
         setCityType(city.payload);
      }
      fetchData();
      return () => {};
   }, []);

   const handleChangeCity = async (e) => {
      const district = await dispatch(getDistrictOptions(e.target.value));
      setDistrictType(district.payload);
   };

   const handleChangeLogo = (e) => {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setMartLogoPreview(objectUrl);
   };
   const handleChangeLogoPush = (e) => {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setMartLogoPushPreview(objectUrl);
   };

   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Mart name(*)</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="name"
                        id="name"
                        value={values.name}
                        onChange={(e) => {
                           setFieldValue("name", e.target.value);
                        }}
                     />
                     {errors.name && (
                        <TextValidate text={errors.name}></TextValidate>
                     )}
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>mart-type-title(*)</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.typemart} onChange={(e) => setFieldValue("typemart", e.target.value)}>
                        {appType.map((ele) => (
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
                  <Typography sx={{ width: 150 }}>mart-type-title(*)</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.martcommon} onChange={(e) => setFieldValue("martcommon", e.target.value)}>
                        {commomMartType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>mart-type-title(*)</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.mart_business_type} onChange={(e) => setFieldValue("mart_business_type", e.target.value)}>
                        {businessType.map((ele) => (
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
                  <Typography sx={{ width: 150 }}>Business Type</Typography>

                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                     {businessMartType.map((ele) => (
                        <FormControlLabel
                           control={<Checkbox defaultChecked={ele.value === values.type} onChange={(e) => setFieldValue("type", e.target.checked)} />}
                           label={`${translate(locale, ele.text)}`}
                        />
                     ))}
                  </FormGroup>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Mart Display status</Typography>

                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                     {martDisplayStatus.map((ele) => (
                        <FormControlLabel
                           control={<Checkbox defaultChecked={ele.value === values.mart_display} onChange={(e) => setFieldValue("mart_display", e.target.checked)} />}
                           label={`${translate(locale, ele.text)}`}
                        />
                     ))}
                  </FormGroup>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Mart logo(*)</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField type="file" onChange={handleChangeLogo} size="small" sx={{ mb: 2 }}></TextField>
                     {martLogoPreview && <img src={martLogoPreview} />}
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Mart logo Push(*)</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField type="file" onChange={handleChangeLogoPush} size="small" sx={{ mb: 2 }}></TextField>
                     {martLogoPushPreview && <img src={martLogoPushPreview} />}
                  </Box>
               </Stack>
            </Grid>
         </Grid>

         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>City(*)</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.city} onChange={(e) => handleChangeCity(e)}>
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {cityType &&
                           cityType.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {translate(locale, ele.name)}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>District(*)</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.district} onChange={(e) => handleChangeCity(e)}>
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {districtType &&
                           districtType.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {translate(locale, ele.name)}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Address(*)</Typography>

                  <TextField
                     type="text"
                     sx={{ maxWidth: 400 }}
                     value={values.address}
                     onChange={(e) => {
                        setFieldValue("address", e.target.value);
                     }}
                  ></TextField>
               </Stack>
            </Grid>
         </Grid>

         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Biz license number(*) </Typography>
                  <TextField
                     size="small"
                     type="text"
                     sx={{ maxWidth: 200 }}
                     value={values.license}
                     onChange={(e) => {
                        setFieldValue("license", e.target.value);
                     }}
                  ></TextField>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Phone number(*) </Typography>
                  <TextField
                     size="small"
                     TextField
                     type="text"
                     sx={{ maxWidth: 200 }}
                     value={values.phone}
                     onChange={(e) => {
                        setFieldValue("phone", e.target.value);
                     }}
                  ></TextField>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Business open hours(*)</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <TimePicker
                        name="bizhour_open"
                        defaultValue={dayjs(values.bizhour_open)}
                        onChange={(e) => {
                           setFieldValue("bizhour_open", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Business close hours(*)</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <TimePicker
                        name="bizhour_close"
                        defaultValue={dayjs(values.bizhour_close)}
                        onChange={(e) => {
                           setFieldValue("bizhour_close", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Pos(*) </Typography>
                  <TextField
                     size="small"
                     type="text"
                     sx={{ maxWidth: 200 }}
                     value={values.pos_regcode}
                     onChange={(e) => {
                        setFieldValue("pos_regcode", e.target.value);
                     }}
                  ></TextField>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Mart group No.(*)</Typography>
                  <TextField
                     size="small"
                     TextField
                     type="text"
                     sx={{ maxWidth: 200 }}
                     value={values.group_no}
                     onChange={(e) => {
                        setFieldValue("group_no", e.target.value);
                     }}
                  ></TextField>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignContent="center">
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography sx={{ width: 150 }}>POS Sync Order</Typography>
                  <RadioGroup
                     defaultValue={values.order_sync}
                     name="order_sync"
                     onChange={(e) => {
                        setFieldValue("order_sync", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     <FormControlLabel value="Y" control={<Radio />} label="Use" />
                     <FormControlLabel value="N" control={<Radio />} label="Not use" />
                  </RadioGroup>
               </FormControl>
            </Grid>
            <Grid item xs={4}>
               <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                  <FormControlLabel
                     control={
                        <Checkbox
                           defaultChecked={values.pos_connect_logic}
                           onChange={(e) => {
                              setFieldValue("pos_connect_logic", e.target.checked);
                           }}
                        />
                     }
                     label={`Pos connect`}
                  />
               </FormGroup>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartInfo;
