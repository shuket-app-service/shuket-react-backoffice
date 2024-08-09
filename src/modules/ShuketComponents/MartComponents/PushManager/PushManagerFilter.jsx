import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterLocate } from "./helper/locate";
import { translate } from "../../../../@crema/services/localization/translate";
import { searchTypes } from "./helper/types";

const PushManagerFilter = ({ dataFilter, changeDataFilter, locale }) => {
    const navigate = useNavigate()

    const gotoAdd = () =>{
        navigate("/app-management/app-push/action?type=add")
    }
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate.title)}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button variant="contained" onClick={gotoAdd}>Add</Button>

            </Stack>
         </Stack>
         <Divider />
         <Stack sx={{ my: 5, px: 35 }}  direction="row" justifyContent={"space-between"}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
               <Typography sx={{width:150}}> {translate(locale, filterLocate.searchBy)} </Typography>
               <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <Select
                     displayEmpty={true}
                     value={dataFilter.s_type}
                     onChange={(e) =>
                        changeDataFilter({
                           ...dataFilter,
                           s_type: e.target.value,
                        })
                     }
                  >
                     {searchTypes.map((ele) => (
                        <MenuItem key={ele.value} value={ele.value}>
                           {translate(locale, ele.text)}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <TextField
                  value={dataFilter.search_keyword}
                  fullWidth
                  onChange={(e) =>
                     changeDataFilter({
                        ...dataFilter,
                        search_keyword: e.target.value,
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

export default PushManagerFilter;
