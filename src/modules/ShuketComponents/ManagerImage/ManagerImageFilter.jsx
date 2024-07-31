import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "../../../@crema/services/localization/translate";
import { filterLocate } from "./Helper/locate";
import { allSelect, imageSearchType, imageType, orderType, statusType } from "./Helper/types";

const ManagerImageFilter = ({ cateType, dataFilter, changeDataFilter, handleSearch, handleReset, locale }) => {
   const navigate = useNavigate();
   const gotoAddMartPage = () => {
      navigate("add-mart");
   };
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography>{translate(locale, filterLocate.title)} </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
               <Button type="button" color="primary" variant="contained" onClick={gotoAddMartPage}>
                  {translate(locale, filterLocate.btnAdd)}
               </Button>
            </Stack>
         </Stack>

         <Divider />
         <CardContent sx={{ mt: 5 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={25} sx={{ mb: 5 }}>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography> {translate(locale, filterLocate.searchBy)} </Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select
                        value={dataFilter.key_type}
                        onChange={(e) =>
                           changeDataFilter({
                              ...dataFilter,
                              key_type: e.target.value,
                           })
                        }
                     >
                        {imageSearchType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
                  <TextField
                     value={dataFilter.keyword_value}
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

               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.imageType)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.image_type} onChange={(e) => changeDataFilter({ ...dataFilter, image_type: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {imageType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.imageCate)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.image_cate} onChange={(e) => changeDataFilter({ ...dataFilter, image_cate: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {cateType &&
                           cateType.map((ele) => (
                              <MenuItem key={ele.cate_code} value={ele.cate_code}>
                                 {ele.cate_name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={25}>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.status)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.filter_status} onChange={(e) => changeDataFilter({ ...dataFilter, filter_status: e.target.value })}>
                        {statusType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.sort)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.filter_order} onChange={(e) => changeDataFilter({ ...dataFilter, filter_order: e.target.value })}>
                        {orderType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" alignItems="center" spacing={5}>
                  <Button variant="contained" onClick={handleSearch}>
                     {translate(locale, filterLocate.btnSearch)}
                  </Button>
                  <Button variant="outlined" color="inherit" onClick={handleReset}>
                     {translate(locale, filterLocate.btnCancel)}
                  </Button>
               </Stack>
            </Stack>
         </CardContent>
      </Card>
   );
};

export default ManagerImageFilter;
