import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { filterLocate } from "./helper/locate";
import { translate } from "@crema/services/localization/translate";
import { Divider, Stack, Table, TableCell, TableRow, TextField } from "@mui/material";
import { initialStateFee } from "./helper/state";

export default function DeliveryAreaSetMulti({ openMulti, handleCloseMulti, locale }) {
   const [deliveryFee, setDeliveryFee] = React.useState(initialStateFee);
   return (
      <React.Fragment>
         <Dialog fullWidth open={openMulti} onClose={handleCloseMulti}>
            <DialogTitle variant="h4">{translate(locale, filterLocate.btnSetMulti)}</DialogTitle>
            <DialogContent>
               <Divider sx={{mb:5}} />

               <Table border={1}>
                  {deliveryFee?.map((ele, index) => {
                     return (
                        <TableRow className={`${ele.class}`}>
                           <TableCell align="center" sx={{ width: 100 }}>
                              {ele?.name}
                           </TableCell>
                           <TableCell align="center" sx={{ width: 100 }}>
                              <TextField size="small" type="text" defaultValue={deliveryFee[index]?.value_fee}></TextField>
                           </TableCell>
                           <TableCell align="center" sx={{ width: 100 }}>
                              <TextField size="small" type="text" defaultValue={deliveryFee[index]?.value_time}></TextField>
                           </TableCell>

                           <TableCell sx={{ width: 100 }} align="center">
                              {ele?.option_use ? "YES" : "NO"}
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </Table>
            </DialogContent>
            <DialogActions>
               <Stack direction={"row"} justifyContent={"center"} gap={5} sx={{ p: 3 }}>
                  <Button variant="outlined">{translate(locale, filterLocate.btnSave)}</Button>
                  <Button variant="outlined" color="inherit" onClick={handleCloseMulti}>
                     {translate(locale, filterLocate.btnClose)}
                  </Button>
               </Stack>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
