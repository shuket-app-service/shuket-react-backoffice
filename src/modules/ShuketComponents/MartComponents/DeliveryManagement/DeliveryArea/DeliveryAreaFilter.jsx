import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { translate } from "@crema/services/localization/translate";
import { filterLocate } from "./helper/locate";
import { searchByType } from "./helper/types";

const DeliveryAreaFilter = ({ dataFilter, changeDataFilterDirectly, handleOpenKakao , handleOpenJuso, locale }) => {
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate.title)}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
               <Button type="button" color="primary" variant="contained" onClick={handleOpenKakao}>
                  {translate(locale, filterLocate.btnKakao)}
               </Button>
               <Button type="button" color="primary" variant="contained" onClick={handleOpenJuso}>
                  {translate(locale, filterLocate.btnJuso)}
               </Button>
            </Stack>
         </Stack>
         <Divider />
         <Stack sx={{ my: 5, px: 35 }} direction="row" justifyContent={"space-between"}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
               <Typography sx={{ width: 150 }}> {translate(locale, filterLocate.searchBy)} </Typography>
               <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <Select
                     displayEmpty={true}
                     value={dataFilter.keyword_type}
                     onChange={(e) =>
                        changeDataFilterDirectly({
                           ...dataFilter,
                           keyword_type: e.target.value,
                        })
                     }
                  >
                     {searchByType.map((ele) => (
                        <MenuItem key={ele.value} value={ele.value}>
                           {translate(locale, ele.text)}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={5}>
                  <Button variant="contained" >
                     {translate(locale, filterLocate.btnSearch)}
                  </Button>
                  <Button variant="outlined" color="inherit">
                     {translate(locale, filterLocate.btnCancel)}
                  </Button>
               </Stack>
         </Stack>
      </Card>
   );
};

export default DeliveryAreaFilter;
