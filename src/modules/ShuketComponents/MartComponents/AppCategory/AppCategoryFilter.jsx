import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { translate } from "../../../../@crema/services/localization/translate";
import { filterLocate } from "./helper/locate";
import { orderType, templateType } from "./helper/types";

const AppCategoryFilter = ({ dataFilter, changeDataFilterDirectly, locale }) => {
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate.title)}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
               <Button type="button" color="primary" variant="contained">
                  {translate(locale, filterLocate.btnAdd)}
               </Button>
            </Stack>
         </Stack>
         <Divider />
         <Stack sx={{ my: 5, px: 35 }} direction="row" justifyContent={"space-between"}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
               <Typography sx={{ width: 150 }}> {translate(locale, filterLocate.date)} </Typography>
               <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <Select
                     displayEmpty={true}
                     value={dataFilter.search_method}
                     onChange={(e) =>
                        changeDataFilterDirectly({
                           ...dataFilter,
                           search_method: e.target.value,
                        })
                     }
                  >
                     {orderType.map((ele) => (
                        <MenuItem key={ele.value} value={ele.value}>
                           {translate(locale, ele.text)}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Stack>

            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
               <Typography sx={{ width: 150 }}> {translate(locale, filterLocate.type)} </Typography>
               <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <Select
                     displayEmpty={true}
                     value={dataFilter.option_cate}
                     onChange={(e) =>
                        changeDataFilterDirectly({
                           ...dataFilter,
                           option_cate: e.target.value,
                        })
                     }
                  >
                     {templateType.map((ele) => (
                        <MenuItem key={ele.value} value={ele.value}>
                           {translate(locale, ele.text)}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Stack>

            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
               <Typography sx={{ width: 150 }}> {translate(locale, filterLocate.categoryName)} </Typography>
               <TextField
                  type="text"
                  defaultValue={dataFilter?.search_key}
                  onChange={(e) =>
                     changeDataFilterDirectly({
                        ...dataFilter,
                        search_key: e.target.value,
                     })
                  }
               />
            </Stack>
         </Stack>
      </Card>
   );
};

export default AppCategoryFilter;
