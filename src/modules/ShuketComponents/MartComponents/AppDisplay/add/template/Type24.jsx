import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "@crema/services/localization/translate";
import { Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { typeLocate } from "../helper/locate/type24";
import { displayTimeType, type } from "../helper/types/type24";
import { inintialState } from "../helper/state/type24";
import AppDisplayBannerTable from "../AppDisplayBannerTable";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

export default function Type24({ open, handleCloseTemplate, sc_code, locale }) {
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
                     <TextField size="small" type="text" value={dataAdd?.title} name="title" onChange={(e) => handleChangeData(e)}></TextField>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.phone)}</Typography>
                     <TextField size="small" type="text" value={dataAdd?.phone} name="title" onChange={(e) => handleChangeData(e)}></TextField>
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
