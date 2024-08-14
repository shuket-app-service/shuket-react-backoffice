import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "../../../../../@crema/services/localization/translate";
import { minMaxLocate } from "./helper/locate";
import { Box, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function ProductRegisterMinMax({ dataMinMax, handleCloseMinMax, locale }) {
    const [tempMinMax, setTempMinMax] = useState(null);
  
    useEffect(() => {
       if (dataMinMax) {
         setTempMinMax(dataMinMax)
       }
    }, [dataMinMax]);

    const handleClose = () =>{
        setTempMinMax(null)
        handleCloseMinMax()
    }

   return (
      <React.Fragment>
         <Dialog open={tempMinMax} onClose={handleClose} fullWidth>
            <DialogTitle>{translate(locale, minMaxLocate.title)}</DialogTitle>
            <DialogContent>
               <Divider />
               <Stack sx={{ px: 10, mt: 5 }} spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={5}>
                     <Typography sx={{minWidth:100}}>{translate(locale, minMaxLocate.isMax)}</Typography>
                     <FormControl>
                        <RadioGroup defaultValue={tempMinMax?.is_pro_maxqty} sx={{ display: "flex", flexDirection: "row" }} onChange={(e)=>setTempMinMax({...tempMinMax, is_pro_maxqty:e.target.value})}>
                           <FormControlLabel value={"Y"} control={<Radio />} label={"YES"} />
                           <FormControlLabel value={"N"} control={<Radio />} label={"NO"} />
                        </RadioGroup>
                     </FormControl>
                  </Stack>
                  {tempMinMax?.is_pro_maxqty === "Y" && (
                     <Stack direction="row" alignItems="center" spacing={5}>
                        <Typography sx={{minWidth:100}}>{translate(locale, minMaxLocate.valueMax)}</Typography>
                        <TextField type="number" defaultValue={tempMinMax?.pro_max_qty} />
                     </Stack>
                  )}

                  <Stack direction="row" alignItems="center" spacing={5}>
                     <Typography sx={{minWidth:100}}>{translate(locale, minMaxLocate.isMin)}</Typography>
                     <FormControl>
                        <RadioGroup defaultValue={tempMinMax?.is_pro_minqty} sx={{ display: "flex", flexDirection: "row" }} onChange={(e)=>setTempMinMax({...tempMinMax, is_pro_minqty:e.target.value})}>
                           <FormControlLabel value={"Y"} control={<Radio />} label={"YES"} />
                           <FormControlLabel value={"N"} control={<Radio />} label={"NO"} />
                        </RadioGroup>
                     </FormControl>
                  </Stack>
                  {tempMinMax?.is_pro_minqty === "Y" && (
                     <Stack direction="row" alignItems="center" spacing={5}>
                        <Typography sx={{minWidth:100}}>{translate(locale, minMaxLocate.valueMin)}</Typography>
                        <TextField type="number" defaultValue={tempMinMax?.pro_min_qty} />
                     </Stack>
                  )}
               </Stack>

               <Stack sx={{ mt: 5 }} direction="row" justifyContent={"center"} alignItems="center" spacing={5}>
                  <Button variant="contained">{translate(locale, minMaxLocate.btnSet)}</Button>
               </Stack>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   );
}
