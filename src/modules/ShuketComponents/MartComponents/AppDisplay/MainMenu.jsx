import React from "react";
import { Button, Card, CardContent, CardHeader, Stack, TextField, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";
import { indexLocate } from "./helper/locate";
import SwitchStatus from "../../Common/SwitchStatus";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainMenu = ({ locale, mainMenu, handleChangeStatus, handleChangeSortPosition }) => {
   const navigate = useNavigate();

   const gotoDetail = (scCode) =>{
      navigate(`action?type=edit&sc_code=${scCode}`);
   }

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
                                 <Button variant="outlined" onClick={()=>gotoDetail(ele.sc_code)}>{translate(locale, indexLocate.btnEdit)}</Button>
                                 <Button variant="outlined" color="error">{translate(locale, indexLocate.btnDelete)}</Button>
                              </Stack>
                              <SwitchStatus status={ele.sc_status === "A" ? true : false} handleChangeStatus={()=>handleChangeStatus(ele.sc_code, ele.sc_status)}></SwitchStatus>
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
