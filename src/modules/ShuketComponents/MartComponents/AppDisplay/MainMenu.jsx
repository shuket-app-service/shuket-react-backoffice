import React from "react";
import { Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";
import { indexLocate } from "./locate";
import SwitchStatus from "../../Common/SwitchStatus";
import { useDispatch } from "react-redux";

const MainMenu = ({ locale, mainMenu, handleChangeStatus, handleChangeSortPosition }) => {
   console.log(mainMenu);
   const dispatch = useDispatch();

   return (
      <Card sx={{ borderRadius: 0 }}>
         <CardHeader title={translate(locale, indexLocate.titleMain)} ></CardHeader>
         <CardContent>
            <Stack direction="row" alignItems="center" gap={5} >
               {mainMenu &&
                  mainMenu.map((ele) => (
                     <Card sx={{ m: 1, boxShadow: 3, width:"20%" }} key={ele.sc_seq} value={ele.sc_code}>
                        <CardContent>
                           <Stack direction="column" alignItems="center" gap={5}>                   
                              <Typography>
                                 {ele.sc_label} ( {ele.sc_code} )
                              </Typography>
                              <TextField onChange={(e) => handleChangeSortPosition(ele.sc_code, e.target.value)} type="number" size="small" sx={{width:"50%"}} value={ele.sort_option}></TextField>
                              <Typography>{translate(locale, indexLocate.numberOfTemplate)} {ele.sc_count}</Typography>
                              <Stack direction="row" alignItems="center" gap={5}>
                                 <Button variant="outlined" >Edit</Button>
                                 <Button variant="outlined" color="error">Delete</Button>
                              </Stack>
                              <SwitchStatus status={ele.sc_status} handleChangeStatus={()=>handleChangeStatus(ele.sc_code, ele.sc_status)}></SwitchStatus>
                           </Stack>
                        </CardContent>
                     </Card>
                  ))}
            </Stack>
         </CardContent>
      </Card>
   );
};

export default MainMenu;
