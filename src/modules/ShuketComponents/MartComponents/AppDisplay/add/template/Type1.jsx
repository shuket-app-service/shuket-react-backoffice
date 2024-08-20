import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "@crema/services/localization/translate";
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { type1Locate } from "../helper/locate/type1";
import { displayTimeType, slideTimeType, type } from "../helper/types/type1";
import { inintialState } from "../helper/state/type1";
import SwitchStatus from "../../../../Common/SwitchStatus";
import AppDisplayBannerTable from "../AppDisplayBannerTable";

export default function Type1({ open, handleCloseTemplate, sc_code, locale }) {
   const [dataAdd, setDataAdd] = useState(inintialState);
   return (
      <React.Fragment>
         <Dialog fullWidth maxWidth="xl" open={open} onClose={handleCloseTemplate}>
            <DialogTitle variant="h4">
               {translate(locale, type1Locate.title)} ({sc_code})
            </DialogTitle>
            <DialogContent>
               <Stack direction={"column"} gap={5}>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, type1Locate.type)}</Typography>
                     <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={dataAdd?.app_tmpl_user_type}>
                        {type?.map((ele) => (
                           <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                        ))}
                     </RadioGroup>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, type1Locate.timeDisplay)}</Typography>
                     <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={dataAdd?.tmpl_set_period_checkbox}>
                        {displayTimeType?.map((ele) => (
                           <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                        ))}
                     </RadioGroup>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, type1Locate.name)}</Typography>
                     <SwitchStatus status={dataAdd?.option_title_display} handleChangeStatus={() => {}}></SwitchStatus>
                     <TextField size="small" type="text" value={dataAdd?.title}></TextField>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, type1Locate.style)}</Typography>
                     <SwitchStatus status={dataAdd?.option_style_display} handleChangeStatus={() => {}}></SwitchStatus>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, type1Locate.banner)}</Typography>
                     <SwitchStatus status={dataAdd?.option_banner} handleChangeStatus={() => {}}></SwitchStatus>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, type1Locate.slide)}</Typography>
                     <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <Select size="small" value={dataAdd.time_slide}>
                           {slideTimeType.map((ele) => (
                              <MenuItem key={ele.value} value={ele.value}>
                                 {translate(locale, ele.text)}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Stack>
                  <AppDisplayBannerTable locale={locale} />
               </Stack>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseTemplate}>Disagree</Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
