import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getPermissionLevel, getPermissionUser } from "../../../store/managerAdmin/thunk";
import BackdropLoad from "../../Common/BackdropLoad";
import { useDispatch } from "react-redux";
import { translate } from "../../../../@crema/services/localization/translate";
import { Collapse } from "react-collapse";
import "../styles/index.css";
import { Box, Checkbox, Divider, Stack, Typography } from "@mui/material";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function ManagerAdminAccountPermission({ dataOpenPermission, handleSetDataOpenPermission, locale }) {
   const [backdropLoading, setBackdropLoading] = useState(false);
   const [data, setData] = useState(null); //data response
   const [expandedId, setExpandedId] = useState(null); //   data expanded
   const [expandedChildId, setExpandedChildId] = useState(null); //   data expanded

   const dispatch = useDispatch();
   async function fetchData() {
      setBackdropLoading(true);
      const response = await dispatch(getPermissionUser(dataOpenPermission));
      setData(response?.payload); // data permission
      setBackdropLoading(false);
   }

   useEffect(() => {
      if (dataOpenPermission) {
         fetchData();
      }
      return () => {};
   }, [dataOpenPermission]);

   const handleToggle = (code) => {
      setExpandedChildId(null); //close child
      setExpandedId(expandedId === code ? null : code);
   };
   const handleToggleChild = (code) => {
      setExpandedChildId(expandedChildId === code ? null : code);
   };

   const handleClose = () => {
      setExpandedId(null);
      setExpandedId(null);
      handleSetDataOpenPermission(null);
   };
   return (
      <React.Fragment>
         {backdropLoading ? (
            <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>
         ) : (
            <Dialog fullWidth maxWidth="lg" open={dataOpenPermission} onClose={handleClose}>
               <DialogTitle></DialogTitle>
               <DialogContent>
                  {data &&
                     data.map((ele) => {
                        return (
                           <Box key={ele?.code} sx={{ cursor: "pointer" }}>
                              <Stack direction={"row"} alignItems={"center"} gap={2} onClick={() => handleToggle(ele?.code)}>
                                 {"items" in ele && <span>{expandedId === ele?.code ? <IoIosArrowForward size={30} /> : <IoIosArrowDown size={30} />}</span>}
                                 <Typography> {translate(locale, ele?.names)}</Typography>
                              </Stack>

                              <Collapse isOpened={expandedId === ele?.code}>
                                 {ele?.items?.length > 0 &&
                                    ele?.items?.map((elc) => {
                                       return (
                                          <Box sx={{ px: 25 }} key={elc?.code}>
                                             <Stack direction={"row"} alignItems={"center"} gap={2} onClick={() => handleToggleChild(elc?.code)}>
                                                {!("items" in elc) && <Checkbox defaultChecked={"chk_flag" in elc && elc.chk_flag} />}
                                                {"items" in elc && (
                                                   <span style={{ marginLeft: 5 }}>{expandedChildId === elc?.code ? <IoIosArrowForward size={30} /> : <IoIosArrowDown size={30} />}</span>
                                                )}

                                                <Typography> {translate(locale, elc?.names)}</Typography>
                                             </Stack>
                                             <Collapse isOpened={expandedChildId === elc?.code} key={elc?.code}>
                                                {"items" in elc &&
                                                   elc?.items?.map((clc) => {
                                                      return (
                                                         <Box sx={{ px: 25 }} key={clc?.code}>
                                                            <Stack direction={"row"} alignItems={"center"} gap={2}>
                                                               <Checkbox defaultChecked={"chk_flag" in clc  && clc.chk_flag} />
                                                               <Typography> {translate(locale, clc?.names)}</Typography>
                                                            </Stack>
                                                         </Box>
                                                      );
                                                   })}
                                             </Collapse>
                                          </Box>
                                       );
                                    })}
                              </Collapse>
                           </Box>
                        );
                     })}
               </DialogContent>
               <Divider />
               <DialogActions sx={{ my: 5, px: 10 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                     <Button variant="contained">Summit</Button>
                     <Button variant="outlined" color="inherit" onClick={handleClose}>
                        Cancel
                     </Button>
                  </Stack>
               </DialogActions>
            </Dialog>
         )}
      </React.Fragment>
   );
}
