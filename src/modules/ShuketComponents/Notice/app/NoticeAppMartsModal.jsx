import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Dialog , DialogContent , Checkbox, FormControlLabel, Stack, Divider } from "@mui/material";
import { martType } from "../helper/types";



export default function NoticeAppMartsModal({ infoMartsNotice, handleCloseModalInfo, gskList, yskList, skList, sgList }) {
   console.log(infoMartsNotice);
   console.log(gskList);
   console.log(yskList);
   console.log(skList);
   console.log(sgList);

   return (
            <Dialog maxWidth="lg" fullWidth open={infoMartsNotice?.length} onClose={handleCloseModalInfo}>
               <DialogContent >
                  {martType?.map((ele) => {
                     return (
                        <Box>
                           <Typography>{ele}</Typography>
                           {ele === "GSK" ? (
                              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                 {gskList?.map((gsk) => {
                                  return  <FormControlLabel control={<Checkbox defaultChecked={(infoMartsNotice && infoMartsNotice.find((mart) => mart === gsk.mart_code)) ? true : false} />} label={gsk.mart_app_name} />;
                                 })}
                              </Stack>
                           ) : ele === "YSK" ? (
                              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                 {yskList?.map((ysk) => {
                                  return  <FormControlLabel control={<Checkbox  defaultChecked={(infoMartsNotice && infoMartsNotice.find((mart) => mart === ysk.mart_code)) ? true : false} />} label={ysk.mart_app_name} />;
                                 })}
                              </Stack>
                           ) : ele === "SK" ? (
                              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                 {skList?.map((sk) => {
                                  return  <FormControlLabel control={<Checkbox  defaultChecked={(infoMartsNotice && infoMartsNotice.find((mart) => mart === sk.mart_code)) ? true : false} />} label={sk.mart_app_name} />;
                                 })}
                              </Stack>
                           ) : ele === "SG" ? (
                              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                 {sgList?.map((sg) => {
                                  return  <FormControlLabel control={<Checkbox  defaultChecked={(infoMartsNotice && infoMartsNotice.find((mart) => mart === sg.mart_code)) ? true : false} />} label={sg.mart_app_name} />;
                                 })}
                              </Stack>
                           ) : null}
                           <Divider sx={{my:2}}/>
                        </Box>
                     );
                  })}
               </DialogContent>
            </Dialog>

   );
}
