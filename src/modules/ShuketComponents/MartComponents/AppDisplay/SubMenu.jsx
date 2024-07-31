import React from "react";
import { Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";
import { indexLocate } from "./helper/locate";

const SubMenu = ({ locale, subMenu }) => {
   console.log(subMenu);
   return (
      <Card sx={{ borderRadius: 0 }}>
         <CardHeader title={translate(locale, indexLocate.titleSub)} ></CardHeader>
         <CardContent>
            <Stack direction="row" alignItems="center" gap={5} >
               {subMenu &&
                  subMenu.map((ele) => (
                     <Card sx={{ m: 1, boxShadow: 3 }} key={ele.sc_seq} value={ele.sc_code}>
                        <CardContent>
                           <Stack direction="column" alignItems="center" gap={5}>
                              <Typography>
                                 {ele.sc_label} ( {ele.sc_code} )
                              </Typography>
                              <Typography>{translate(locale, indexLocate.numberOfTemplate)} {ele.sc_count}</Typography>
                              <Button variant="outlined">Edit</Button>
                           </Stack>
                        </CardContent>
                     </Card>
                  ))}
            </Stack>
         </CardContent>
      </Card>
   );
};

export default SubMenu;
