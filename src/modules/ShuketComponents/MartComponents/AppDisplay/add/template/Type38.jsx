import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "@crema/services/localization/translate";
import { Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { typeLocate } from "../helper/locate/type38";
import {  timeShowType, type } from "../helper/types/type38";
import { inintialState } from "../helper/state/type38";
import SwitchStatus from "../../../../Common/SwitchStatus";
import AppDisplayBannerTable from "../AppDisplayBannerTable";


export default function Type38({ open, handleCloseTemplate, sc_code, locale }) {
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
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.name)}</Typography>
                     <SwitchStatus status={dataAdd?.option_title_display} handleChangeStatus={() => {}}></SwitchStatus>
                     <TextField size="small" type="text" value={dataAdd?.title} name="title" onChange={(e) => handleChangeData(e)}></TextField>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} gap={5}>
                     <Typography sx={{ minWidth: 200 }}>{translate(locale, typeLocate.timeDisplay)}</Typography>
                     <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={dataAdd?.itemInRow} name="tmpl_set_period_checkbox" onChange={(e) => handleChangeData(e)}>
                        {timeShowType?.map((ele) => (
                           <FormControlLabel value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                        ))}
                     </RadioGroup>
                  </Stack>
                  <AppDisplayBannerTable optionName={true} locale={locale} />
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
