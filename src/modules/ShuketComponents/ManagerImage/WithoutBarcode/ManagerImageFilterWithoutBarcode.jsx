import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterLocaleWithBarcode, filterLocate } from "../Helper/locate";
import { allSelect, imageSearchType, imageType, imageWithBarcodeSearchType, orderType, statusType, statusWithBarcodeType } from "../Helper/types";
import { translate } from "../../../../@crema/services/localization/translate";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

const ManagerImageFilterWithoutBarcode = ({ dataFilter, changeDataFilter, handleSearch, handleReset, locale }) => {
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
         <CardContent sx={{ mt: 5, px:35 }}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={25} sx={{ mb: 5 }}>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography sx={{ width: 100 }}>  {translate(locale, filterLocate.searchBy)} </Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select
                        value={dataFilter.keyword_type}
                        onChange={(e) =>
                           changeDataFilter({
                              ...dataFilter,
                              keyword_type: e.target.value,
                           })
                        }
                     >
                        {imageWithBarcodeSearchType.map((ele) => (
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

               <Stack direction="row" alignItems="center" gap={3}>
                  <Typography sx={{ width: 50 }}>{translate(locale, filterLocaleWithBarcode.dateReg)}</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        name="date_start"
                        defaultValue={dayjs(dataFilter.date_start ? dataFilter.date_start : moment().format("YYYY-MM-DDTHH:mm"))}
                        onChange={(e) => {
                           setFieldValue("date_start", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        name="date_end"
                        defaultValue={dayjs(dataFilter.date_end ? dataFilter.date_end : moment().format("YYYY-MM-DDTHH:mm"))}
                        onChange={(e) => {
                           setFieldValue("date_end", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
            </Stack>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={25}>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography sx={{ width: 100 }}>{translate(locale, filterLocate.status)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.status} onChange={(e) => changeDataFilter({ ...dataFilter, status: e.target.value })}>
                        {statusWithBarcodeType.map((ele) => (
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

export default ManagerImageFilterWithoutBarcode;
