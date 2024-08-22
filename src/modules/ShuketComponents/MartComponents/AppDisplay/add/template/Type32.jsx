import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "@crema/services/localization/translate";
import { Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { typeLocate } from "../helper/locate/type32";
import { alignType, displayTimeType, fontSizeType, slideTimeType, type, weightType } from "../helper/types/type32";
import { inintialState } from "../helper/state/type32";
import SwitchStatus from "../../../../Common/SwitchStatus";
import AppDisplayBannerTable from "../AppDisplayBannerTable";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

export default function Type32({ open, handleCloseTemplate, sc_code, locale }) {
   const [dataAdd, setDataAdd] = useState(inintialState);
   const handleChangeData = async (e) => {
      setDataAdd((preState) => ({
         ...preState,
         [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
   };

   return (
      <React.Fragment>
         <Dialog fullWidth maxWidth="xl" open={open} onClose={handleCloseTemplate}>
            <DialogTitle variant="h4" sx={{ paddingX: 20, paddingY: 10 }}>
               {translate(locale, typeLocate.title)} ({sc_code})
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ paddingX: 20, paddingY: 10 }}>
               <Stack direction={"column"} gap={5}>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.type)}</Typography>
                     <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={dataAdd?.app_tmpl_user_type}>
                        {type?.map((ele) => (
                           <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                        ))}
                     </RadioGroup>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.timeDisplay)}</Typography>
                     <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={dataAdd?.tmpl_set_period_checkbox} name="tmpl_set_period_checkbox" onChange={(e) => handleChangeData(e)}>
                        {displayTimeType?.map((ele) => (
                           <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                        ))}
                     </RadioGroup>
                  </Stack>
                  {dataAdd?.tmpl_set_period_checkbox === "Use" && (
                     <Stack direction="row" alignItems="center" gap={3}>
                        <Typography sx={{ maxWidth: 200 }}>{translate(locale, typeLocate.setTimeDisplay)}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <DatePicker name="tmpl_sdate" defaultValue={dayjs(dataAdd.tmpl_sdate ? dataAdd.tmpl_sdate : moment().format("YYYY-MM-DDTHH:mm"))} />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <DatePicker name="tmpl_edate" defaultValue={dayjs(dataAdd.tmpl_edate ? dataAdd.tmpl_edate : moment().format("YYYY-MM-DDTHH:mm"))} />
                        </LocalizationProvider>
                     </Stack>
                  )}

                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.name)}</Typography>
                     <SwitchStatus status={dataAdd?.option_title_display} handleChangeStatus={() => {}}></SwitchStatus>
                     <TextField size="small" type="text" value={dataAdd?.title} name="title" onChange={(e) => handleChangeData(e)}></TextField>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.style)}</Typography>
                     <Stack direction={"column"} gap={2}>
                        <Stack direction={"row"} gap={5} alignItems={"center"}>
                           <Typography sx={{ minWidth: 100, maxWidth: 100 }}>Font size</Typography>
                           <FormControl sx={{ m: 1, width: 100 }}>
                              <Select size="small" value={dataAdd.title_style.font_size} name="font_size" onChange={(e) => handleChangeData(e)}>
                                 {fontSizeType.map((ele) => (
                                    <MenuItem key={ele.value} value={ele.value}>
                                       {translate(locale, ele.text)}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Stack>
                        <Stack direction={"row"} gap={5} alignItems={"center"}>
                           <Typography sx={{ minWidth: 100, maxWidth: 100 }}>Font color</Typography>
                           <TextField value={dataAdd.title_style.font_color} sx={{ width: 100 }} size="small" type="color" />
                        </Stack>
                        <Stack direction={"row"} gap={5} alignItems={"center"}>
                           <Typography sx={{ minWidth: 100, maxWidth: 100 }}>Font weight</Typography>
                           <FormControl sx={{ m: 1, width: 100 }}>
                              <Select size="small" value={dataAdd.title_style.font_weight} name="font_weight" onChange={(e) => handleChangeData(e)}>
                                 {weightType.map((ele) => (
                                    <MenuItem key={ele.value} value={ele.value}>
                                       {translate(locale, ele.text)}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Stack>
                        <Stack direction={"row"} gap={5} alignItems={"center"}>
                           <Typography sx={{ minWidth: 100, maxWidth: 100 }}>Align style</Typography>
                           <FormControl sx={{ m: 1, width: 100 }}>
                              <Select size="small" value={dataAdd.title_style.align} name="align" onChange={(e) => handleChangeData(e)}>
                                 {alignType.map((ele) => (
                                    <MenuItem key={ele.value} value={ele.value}>
                                       {translate(locale, ele.text)}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Stack>
                        <Stack direction={"row"} gap={5} alignItems={"center"}>
                           <Typography sx={{ minWidth: 100, maxWidth: 100 }}>Padding</Typography>
                           <Stack direction={"column"} gap={3} alignItems={"center"}>
                              <Stack direction={"row"} gap={5} alignItems={"center"}>
                                 <Typography sx={{ minWidth: 150, maxWidth: 150,  display:"flex", alignItems:"center", gap:2 }}>
                                    {" "}
                                    <NorthIcon /> <span> Padding top</span>{" "}
                                 </Typography>
                                 <TextField defaultValue={dataAdd.title_style.padding[0]} sx={{ width: 100 }} size="small" type="number" />
                              </Stack>
                              <Stack direction={"row"} gap={5} alignItems={"center"}>
                                 <Typography sx={{ minWidth: 150, maxWidth: 150, display:"flex", alignItems:"center", gap:2 }}>
                                    {" "}
                                    <SouthIcon /> <span> Padding bottom</span>
                                 </Typography>
                                 <TextField defaultValue={dataAdd.title_style.padding[1]} sx={{ width: 100 }} size="small" type="number" />
                              </Stack>
                              <Stack direction={"row"} gap={5} alignItems={"center"}>
                                 <Typography sx={{ minWidth: 150, maxWidth: 150 , display:"flex", alignItems:"center", gap:2 }}>
                                    <WestIcon /> <span> Padding left</span>
                                 </Typography>
                                 <TextField defaultValue={dataAdd.title_style.padding[2]} sx={{ width: 100 }} size="small" type="number" />
                              </Stack>
                              <Stack direction={"row"} gap={5} alignItems={"center"}>
                                 <Typography sx={{ minWidth: 150, maxWidth: 150,  display:"flex", alignItems:"center", gap:2 }}>
                                    {" "}
                                    <EastIcon />
                                    <span> Padding right</span>
                                 </Typography>
                                 <TextField defaultValue={dataAdd.title_style.padding[3]} sx={{ width: 100 }} size="small" type="number" />
                              </Stack>
                           </Stack>
                        </Stack>
                     </Stack>
                  </Stack>

                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.slide)}</Typography>
                     <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <Select size="small" value={dataAdd.time_slide} name="time_slide" onChange={(e) => handleChangeData(e)}>
                           {slideTimeType.map((ele) => (
                              <MenuItem key={ele} value={ele}>
                                 {ele}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Stack>
                  <AppDisplayBannerTable optionName={false} locale={locale} />
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                     <Button type="button" color="primary" variant="contained">
                        {translate(locale, typeLocate.btnSave)}
                     </Button>
                  </Stack>
               </Stack>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   );
}
