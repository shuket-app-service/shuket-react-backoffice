import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { modalSetLocate, tableLocate } from "./helper/locate";
import { translate } from "@crema/services/localization/translate";
import { priceSaleType, priceType } from "./helper/types";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

export default function ProductPriceSet({ openSetPrice, handleCloseSetPrice, handleChangeDataPrice, locale }) {
   console.log("openSetPrice", openSetPrice);
   return (
      openSetPrice && (
         <React.Fragment>
            <Dialog fullWidth maxWidth={openSetPrice.length === 1 ? "sm" : "lg"} open={openSetPrice.length > 0} onClose={handleCloseSetPrice}>
               <DialogTitle variant="h4">{translate(locale, modalSetLocate.title)}</DialogTitle>
               <DialogContent>
                  {openSetPrice?.map((row, index) => (
                     <>
                        <Stack alignItems={"start"} direction={openSetPrice.length === 1 ? "column" : "row"} gap={5} sx={{ mb: 5 }}>
                           <Stack direction={"row"} gap={5} sx={{ width: openSetPrice.length === 1 ? "100%" : "45%" }}>
                              <img src={row?.images?.[0]?.thumb} style={{ width: 150, cursor: "pointer" }} />
                              <Box>
                                 <Typography>
                                    <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.code)}</span>
                                    <span> {row?.code}</span>
                                 </Typography>
                                 <Typography>
                                    <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.barcode)} </span>
                                    <span> {row?.barcode}</span>
                                 </Typography>
                                 <Typography>
                                    <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.category)}</span>
                                    <span> {row?.category}</span>
                                 </Typography>
                                 <Typography>
                                    <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.name)}</span>
                                    <span> {row?.name}</span>
                                 </Typography>
                                 <Typography>
                                    <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.unit)}</span>
                                    <span> {row?.unit}</span>
                                 </Typography>
                                 <Typography>
                                    <span style={{ color: "#3A80D7" }}> {translate(locale, tableLocate.tags)}</span>
                                    <span> {row?.tags}</span>
                                 </Typography>
                              </Box>
                           </Stack>
                           <Stack direction={"column"} justifyContent={"center"} alignItems={"start"} gap={5} sx={{ width: openSetPrice.length === 1 ? "100%" : "45%" }}>
                              <Box>
                                 <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
                                    <Typography sx={{ minWidth: 100 }}>{translate(locale, modalSetLocate.price)}</Typography>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                       <Select displayEmpty={true} value={row?.price_type}>
                                          {priceType.map((ele) => (
                                             <MenuItem key={ele.value} value={ele.value}>
                                                {translate(locale, ele.text)}
                                             </MenuItem>
                                          ))}
                                       </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                       <Select displayEmpty={true} value={row?.price_updown}>
                                          {priceSaleType.map((ele) => (
                                             <MenuItem key={ele.value} value={ele.value}>
                                                {translate(locale, ele.text)}
                                             </MenuItem>
                                          ))}
                                       </Select>
                                    </FormControl>
                                 </Stack>
                              </Box>
                              <Box>
                                 <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
                                    <Typography sx={{ minWidth: 100 }}>{translate(locale, modalSetLocate.value)}</Typography>
                                    <TextField fullWidth type="number" defaultValue={row?.price_number}></TextField>
                                 </Stack>
                              </Box>
                              <Box>
                                 <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
                                    <Typography sx={{ minWidth: 100 }}>{translate(locale, modalSetLocate.period)}</Typography>
                                    <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                                       <RadioGroup name="use_time" onChange={(e) => handleChangeDataPrice(e, row?.seq)} defaultValue={row?.use_time} sx={{ display: "flex", flexDirection: "row" }}>
                                          <FormControlLabel value="1" control={<Radio />} label="Use" />
                                          <FormControlLabel value="0" control={<Radio />} label="Not use" />
                                       </RadioGroup>
                                    </FormControl>{" "}
                                 </Stack>
                              </Box>
                              {row?.use_time && (
                                 <Box>
                                    <Stack direction="row" alignItems="center" gap={3}>
                                       <Typography sx={{ minWidth: 100 }}>{translate(locale, modalSetLocate.setPeriod)}</Typography>
                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker name="time_start" defaultValue={dayjs(row?.time_start ? row?.time_start : moment().format("YYYY-MM-DDTHH:mm"))} />
                                       </LocalizationProvider>
                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker name="time_end" defaultValue={dayjs(row?.time_end ? row?.time_end : moment().format("YYYY-MM-DDTHH:mm"))} />
                                       </LocalizationProvider>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" gap={3} sx={{ my: 5 }}>
                                       <Typography sx={{ width: 100 }}>{translate(locale, modalSetLocate.startTime)}</Typography>
                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <TimePicker defaultValue={dayjs(row.hour_start)} />
                                       </LocalizationProvider>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" gap={3}>
                                       <Typography sx={{ width: 100 }}>{translate(locale, modalSetLocate.endTime)}</Typography>
                                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <TimePicker defaultValue={dayjs(row.hour_end)} />
                                       </LocalizationProvider>
                                    </Stack>
                                 </Box>
                              )}
                           </Stack>
                        </Stack>
                        <Divider sx={{mb:5}} />
                     </>
                  ))}
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleCloseSetPrice}>Cancel</Button>
               </DialogActions>
            </Dialog>
         </React.Fragment>
      )
   );
}
