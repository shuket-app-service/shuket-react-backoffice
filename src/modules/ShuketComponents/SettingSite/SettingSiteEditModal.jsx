import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { modalLocate } from "./helper/locate";
import { translate } from "../../../@crema/services/localization/translate";
import { Box, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { initialFront, prefixImg } from "../../../@crema/constants/AppConst";

export default function SettingSiteEditModal({ dataEdit, handleOpenEdit, locale }) {
   const handleCloseEdit = () => {
      handleOpenEdit(null);
   };

   return (
      <React.Fragment>
         <Dialog open={dataEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
            <DialogTitle>{translate(locale, modalLocate.title)}</DialogTitle>
            <Divider />

            <DialogContent>
               <DialogContentText>
                  <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5}>
                     <Typography>{dataEdit?.name_config}</Typography>
                     <FormControl>
                        <RadioGroup defaultValue={dataEdit?.option_check} sx={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                           <FormControlLabel value={true} control={<Radio />} label="Yes" />
                           <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                     </FormControl>
                  </Stack>
                  {dataEdit?.name_config === "COUPON_TIME_DELAY" && (
                     <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5} sx={{ mt: 10 }}>
                        <Typography>VALUE CONFIG</Typography>
                        <TextField type="number" defaultValue={dataEdit?.value_config}></TextField>
                     </Stack>
                  )}
                  {dataEdit?.name_config === "BANNER_HOTLINE" && (
                     <Box>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5} sx={{ mt: 10 }}>
                           <Typography>OLD BANNER</Typography>
                           <img style={{width:250}} src={initialFront + prefixImg.banner + dataEdit?.value_config} alt="" />
                        </Stack>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5} sx={{ mt: 10 }}>
                           <Typography>SET NEW BANNER</Typography>
                           <TextField type="file" sx={{width:250}}></TextField>
                        </Stack>
                     </Box>
                  )}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button sx={{ display: "block", margin: "auto", my: 5 }} variant="contained">
                  Save
               </Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
