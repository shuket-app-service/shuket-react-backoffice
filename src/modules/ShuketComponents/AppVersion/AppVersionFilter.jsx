import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterLocate } from "./helper/locate";
import { translate } from "../../../@crema/services/localization/translate";
import { martType } from "./helper/types";

const AppVersionFilter = ({ dataFilter, changeDataFilter, locale }) => {

   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate.title)}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            </Stack>
         </Stack>
         <Divider />
         <Stack sx={{ my: 5, px: 35 }}  direction="row" justifyContent={"space-between"}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
               <Typography sx={{width:150}}> {translate(locale, filterLocate.searchBy)} </Typography>
               <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <Select
                     displayEmpty={true}
                     value={dataFilter.keyword_type}
                     onChange={(e) =>
                        changeDataFilter({
                           ...dataFilter,
                           keyword_type: e.target.value,
                        })
                     }
                  >
                     {martType.map((ele) => (
                        <MenuItem key={ele.value} value={ele.value}>
                           {translate(locale, ele.text)}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <TextField
                  value={dataFilter.keyword_value}
                  fullWidth
                  onChange={(e) =>
                     changeDataFilter({
                        ...dataFilter,
                        keyword_value: e.target.value,
                     })
                  }
                  hiddenLabel
                  variant="outlined"
               />
            </Stack>
            <Stack direction="row" justifyContent="end" alignItems="center" spacing={5}>
               <Button variant="outlined"> {translate(locale, filterLocate.btnSearch)}</Button>
               <Button variant="outlined" color="inherit"> {translate(locale, filterLocate.btnCancel)}</Button>
            </Stack>
         </Stack>
      </Card>
   );
};

export default AppVersionFilter;
