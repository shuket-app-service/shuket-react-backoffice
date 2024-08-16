import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "../../../../@crema/services/localization/translate";
import { filterLocate } from "./helper/locate";
import { allSelect, searchByPaymentTypes, searchByTypes } from "./helper/types";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import { getListMartOrder } from "../../../store/managerOrder/thunk";
import { useDispatch } from "react-redux";

const NicepayFilter = ({ dataFilter, locale }) => {
   const [martTypes, setMartTypes] = useState([]);

   const dispatch = useDispatch();
   async function fetchData() {
      const resMart = await dispatch(getListMartOrder());
      setMartTypes(resMart?.payload);
   }

   useEffect(() => {
      fetchData();
      return () => {};
   }, []);
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate.title)}</Typography>
         </Stack>
         <Divider />
         <Stack sx={{ my: 5, px: 35 }} direction="row" justifyContent={"space-between"}>
            <Stack direction="row" justifyContent="start" alignItems="center" spacing={5} useFlexGap flexWrap="wrap">
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography sx={{ width: 100 }}>{translate(locale, filterLocate.chooseMart)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select size="small" displayEmpty={true} value={dataFilter.mart_code} onChange={(e) => changeDataFilter({ ...dataFilter, search_mart: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {martTypes &&
                           martTypes?.map((ele) => (
                              <MenuItem key={ele.mart_id} value={ele.mart_id}>
                                 {ele.mart_name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
                  <Typography sx={{ width: 100 }}> {translate(locale, filterLocate.searchBy)} </Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select
                        size="small"
                        displayEmpty={true}
                        value={dataFilter.search_type}
                        onChange={(e) =>
                           changeDataFilter({
                              ...dataFilter,
                              search_type: e.target.value,
                           })
                        }
                     >
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {searchByTypes.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
                  <TextField
                     size="small"
                     sx={{ width: 200 }}
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
               <Stack direction="row" justifyContent="start" alignItems="center" spacing={5}>
                  <Typography sx={{ width: 100 }}> {translate(locale, filterLocate.searchPayment)} </Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select
                        size="small"
                        displayEmpty={true}
                        value={dataFilter.search_status}
                        onChange={(e) =>
                           changeDataFilter({
                              ...dataFilter,
                              search_status: e.target.value,
                           })
                        }
                     >
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {searchByPaymentTypes.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography sx={{ width: 100 }}>{translate(locale, filterLocate.orderDate)}</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        slotProps={{ textField: { size: "small" } }}
                        sx={{ width: 200, }}
                        name="search_sdate"
                        defaultValue={dayjs(dataFilter.search_sdate ? dataFilter.search_sdate : moment().format("YYYY-MM-DDTHH:mm"))}
                        onChange={(e) => {
                           setFieldValue("search_sdate", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        slotProps={{ textField: { size: "small" } }}
                        sx={{ width: 200 }}
                        name="search_edate"
                        defaultValue={dayjs(dataFilter.search_edate ? dataFilter.search_edate : moment().format("YYYY-MM-DDTHH:mm"))}
                        onChange={(e) => {
                           setFieldValue("search_edate", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
               <Stack direction="row" alignItems="center" justifyContent={"right"} spacing={5}>
                  <Button variant="contained">{translate(locale, filterLocate.btnSearch)}</Button>
                  <Button variant="outlined" color="inherit">
                     {translate(locale, filterLocate.btnReset)}
                  </Button>
               </Stack>
            </Stack>
         </Stack>
      </Card>
   );
};

export default NicepayFilter;
