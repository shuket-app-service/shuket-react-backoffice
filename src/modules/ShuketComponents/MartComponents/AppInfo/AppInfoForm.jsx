import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { translate } from "../../../../@crema/services/localization/translate";
import { defaultSelect, detailLocate } from "./helper/locate";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MdOutlineAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import { limitOrderTypes, smartReceiptTypes, timeTypes } from "./helper/types";

const AppInfoForm = ({ dataDetail, cityType, districtType, handleChangeCity, handleChangeNotice, handleChangeData, locale }) => {
   const [martLogoPreview, setMartLogoPreview] = useState(null);
   const [martLogoPushPreview, setMartLogoPushPreview] = useState(null);

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
      <Box>
         <Card sx={{ borderRadius: 0, mb: 5 }}>
            <CardContent sx={{ px: 10, py: 10 }}>
               <Typography variant="h4">{translate(locale, detailLocate.title)}</Typography>
               <Typography>
                  {translate(locale, detailLocate.lastUpdate)} {dataDetail?.m_time}
               </Typography>
            </CardContent>
         </Card>
         <Card sx={{ borderRadius: 0 }}>
            <CardContent sx={{ px: 10, py: 10 }}>
               <Grid container spacing={5} alignItems="center" sx={{ mb: 5 }}>
                  <Grid item xs={12}>
                     <Stack direction="row" justifyContent="left" spacing={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.banner)}</Typography>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                           <img src={dataDetail?.banner_app_url} style={{ width: 150 }} />
                           <TextField size="small" type="file" onChange={handleChangeLogo}></TextField>
                        </Stack>
                        <Box sx={{ maxWidth: 250 }}>{martLogoPreview && <img src={martLogoPreview} />}</Box>
                     </Stack>
                  </Grid>
                  <Grid item xs={12}>
                     <Stack direction="row" justifyContent="left" spacing={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.logo)}</Typography>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                           <img src={dataDetail?.logo_app_url} style={{ width: 150 }} />
                           <TextField size="small" type="file" onChange={handleChangeLogoPush}></TextField>
                        </Stack>
                        <Box sx={{ maxWidth: 250 }}>{martLogoPushPreview && <img src={martLogoPushPreview} />}</Box>
                     </Stack>
                  </Grid>
               </Grid>
               <Grid container spacing={5} alignItems="center" sx={{ mb: 5 }}>
                  <Grid item xs={3}>
                     <Stack direction="row" justifyContent="left" spacing={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.bgColor)}</Typography>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                           <TextField sx={{ width: 150 }} size="small" type="color" defaultValue={dataDetail?.mart_bgcolor_app}></TextField>
                        </Stack>
                     </Stack>
                  </Grid>
                  <Grid item xs={3}>
                     <Stack direction="row" justifyContent="left" spacing={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.phone)}</Typography>
                        <Stack direction="column" justifyContent="center" spacing={2}>
                           <TextField sx={{ width: 150 }} size="small" fullWidth type="text" defaultValue={dataDetail?.phone}></TextField>
                        </Stack>
                     </Stack>
                  </Grid>
               </Grid>

               <Grid container spacing={5} alignItems="center" sx={{ mb: 5 }}>
                  <Grid item xs={3}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}> {translate(locale, detailLocate.city)}</Typography>
                        <FormControl sx={{ m: 1 }}>
                           <Select sx={{ width: 150 }} size="small" name="city" displayEmpty={true} value={dataDetail?.city} onChange={(e) => handleChangeCity(e.target.value)}>
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
                  <Grid item xs={3}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}> {translate(locale, detailLocate.district)}</Typography>
                        <FormControl sx={{ m: 1 }}>
                           <Select sx={{ width: 150 }} size="small" name="district" displayEmpty={true} value={dataDetail?.district} onChange={(e) => handleChangeData(e)}>
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
                  <Grid item xs={6}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}> {translate(locale, detailLocate.address)}</Typography>
                        <TextField fullWidth type="text" defaultValue={dataDetail?.address} />
                     </Stack>
                  </Grid>
               </Grid>
               <Grid container spacing={5} alignContent="center" sx={{ mb: 5 }}>
                  <Grid item xs={6}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.businessOpen)}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <TimePicker
                              name="bizhour_open"
                              defaultValue={dayjs(dataDetail.bizhour_open, "HHmm")}
                              onChange={(e) => {
                                 handleChangeData(e);
                              }}
                           />
                        </LocalizationProvider>
                     </Stack>
                  </Grid>
                  <Grid item xs={6}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.businessClose)}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <TimePicker
                              name="bizhour_close"
                              defaultValue={dayjs(dataDetail.bizhour_close, "HHmm")}
                              onChange={(e) => {
                                 handleChangeData(e);
                              }}
                           />
                        </LocalizationProvider>
                     </Stack>
                  </Grid>
               </Grid>
               <Grid container spacing={5} alignContent="center" sx={{ mb: 5 }}>
                  <Grid item xs={6}>
                     <Stack direction="row" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.notice)}</Typography>
                        <Stack direction="column" justifyContent={"start"} alignItems="center" gap={10}>
                           {dataDetail?.notice.map((ele, index) => (
                              <Stack gap={2} direction={"row"} key={ele?.id}>
                                 <TextField fullWidth sx={{ width: 500 }} type="text" defaultValue={ele?.name}></TextField>

                                 {dataDetail?.notice?.length > 1 && (
                                    <IconButton>
                                       <RiSubtractLine onClick={() => handleChangeNotice("-")} />
                                    </IconButton>
                                 )}

                                 {dataDetail?.notice?.length < 3 && (
                                    <IconButton>
                                       <MdOutlineAdd onClick={() => handleChangeNotice("+")} />
                                    </IconButton>
                                 )}
                              </Stack>
                           ))}
                        </Stack>
                     </Stack>
                  </Grid>
                  <Grid item xs={6}>
                     {dataDetail?.notice?.length > 1 && (
                        <Stack direction="row" alignItems="center" gap={10}>
                           <Typography sx={{ minWidth: 180, textAlign: "right" }}> {translate(locale, detailLocate.timeNotice)}</Typography>
                           <TextField type="number" defaultValue={dataDetail?.time_slide_noti} />
                        </Stack>
                     )}
                  </Grid>
               </Grid>
               <Grid container spacing={5} sx={{ mb: 5 }}>
                  <Grid item xs={4}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "start", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.intro)}</Typography>

                        <RadioGroup
                           defaultValue={dataDetail?.set_intro}
                           name="set_intro"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           <FormControlLabel value="Y" control={<Radio />} label="Use" />
                           <FormControlLabel value="N" control={<Radio />} label="Not use" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.orderDeli)}</Typography>
                        <RadioGroup
                           defaultValue={dataDetail?.set_delivery}
                           name="set_delivery"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           <FormControlLabel value="Y" control={<Radio />} label="Use" />
                           <FormControlLabel value="N" control={<Radio />} label="Not use" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.orderPick)}</Typography>
                        <RadioGroup
                           defaultValue={dataDetail?.store_set_hour}
                           name="store_set_hour"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           <FormControlLabel value="Y" control={<Radio />} label="Use" />
                           <FormControlLabel value="N" control={<Radio />} label="Not use" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
               </Grid>
               {dataDetail?.set_intro === "Y" && (
                  <Grid container spacing={5} sx={{ mb: 5 }}>
                     <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" gap={10}>
                           <Typography sx={{ minWidth: 180, textAlign: "right" }}> {translate(locale, detailLocate.timeNotice)}</Typography>
                           <TextField type="text" fullWidth multiline rows={2} defaultValue={dataDetail?.mart_intro_app} />
                        </Stack>
                     </Grid>
                  </Grid>
               )}

               <Grid container spacing={5} alignContent="center" sx={{ mb: 5 }}>
                  <Grid item xs={4}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}> {translate(locale, detailLocate.intervalTime)}</Typography>
                        <FormControl sx={{ m: 1 }}>
                           <Select
                              sx={{ width: 150 }}
                              size="small"
                              name="store_pick_time_interval"
                              displayEmpty={true}
                              value={dataDetail?.store_pick_time_interval}
                              onChange={(e) => handleChangeData(e)}
                           >
                              <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                                 {translate(locale, defaultSelect.text)}
                              </MenuItem>
                              {timeTypes.map((ele) => (
                                 <MenuItem key={ele.value} value={ele.value}>
                                    {translate(locale, ele.text)}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                     </Stack>
                  </Grid>
                  <Grid item xs={4}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.timeStart)}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <TimePicker
                              name="store_set_hour_start"
                              defaultValue={dayjs(dataDetail.store_set_hour_start, "HH:mm")}
                              onChange={(e) => {
                                 handleChangeData(e);
                              }}
                           />
                        </LocalizationProvider>
                     </Stack>
                  </Grid>
                  <Grid item xs={4}>
                     <Stack direction="row" alignItems="center" gap={10}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.timeEnd)}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <TimePicker
                              name="store_set_hour_end"
                              defaultValue={dayjs(dataDetail.store_set_hour_end, "HH:mm")}
                              onChange={(e) => {
                                 handleChangeData(e);
                              }}
                           />
                        </LocalizationProvider>
                     </Stack>
                  </Grid>
               </Grid>
               <Grid container spacing={5} sx={{ mb: 5 }}>
                  <Grid item xs={4}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "start", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.pickCOD)}</Typography>
                        <RadioGroup
                           defaultValue={dataDetail?.store_pk_cod}
                           name="store_pk_cod"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           <FormControlLabel value="Y" control={<Radio />} label="Use" />
                           <FormControlLabel value="N" control={<Radio />} label="Not use" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.footerCompany)}</Typography>
                        <RadioGroup
                           defaultValue={dataDetail?.show_mart_company_info}
                           name="show_mart_company_info"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           <FormControlLabel value="Y" control={<Radio />} label="Use" />
                           <FormControlLabel value="N" control={<Radio />} label="Not use" />
                        </RadioGroup>
                     </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.smartReceipt)}</Typography>
                        <RadioGroup
                           defaultValue={dataDetail?.smart_receipt}
                           name="smart_receipt"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           {smartReceiptTypes.map((ele) => (
                              <MenuItem key={ele.value} value={ele.value}>
                                 <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                              </MenuItem>
                           ))}
                        </RadioGroup>
                     </FormControl>
                  </Grid>
               </Grid>

               <Grid container spacing={5} alignContent="center" sx={{ mb: 5 }}>
                  <Grid item xs={12}>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Typography sx={{ minWidth: 180, textAlign: "right" }}>{translate(locale, detailLocate.limitOrder)}</Typography>
                        <RadioGroup
                           defaultValue={dataDetail?.receive_option}
                           name="receive_option"
                           onChange={(e) => {
                              handleChangeData(e);
                           }}
                           sx={{ display: "flex", flexDirection: "row" }}
                        >
                           {limitOrderTypes.map((ele) => (
                              <MenuItem key={ele.value} value={ele.value}>
                                 <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                              </MenuItem>
                           ))}
                        </RadioGroup>
                     </FormControl>
                  </Grid>
               </Grid>

               <Stack sx={{ mb: 5 }} direction="row" justifyContent="center" alignItems="center">
                  <Button type="submit" color="primary" variant="contained" onSubmit={() => handleSubmit()}>
                     {translate(locale, detailLocate.btnSummit)}
                  </Button>
               </Stack>
            </CardContent>
         </Card>
      </Box>
   );
};

export default AppInfoForm;
