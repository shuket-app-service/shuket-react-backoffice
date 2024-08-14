import { Button, Card, CardContent, Divider, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { filterLocate } from "./helper/locate";
import { allSelect } from "./helper/types";
import React, { useEffect, useState } from "react";
import { getListMartOrder, getListPaymentOrder, getListStatusOrder } from "../../store/managerOrder/thunk";
import { useDispatch } from "react-redux";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

const ManagerOrderFilter = ({ dataFilter, changeDataFilter, handleSearch, locale }) => {
   const dispatch = useDispatch();
   const [martTypes, setMartTypes] = useState([]);
   const [paymentTypes, setPaymentTypes] = useState([]);
   const [statusTypes, setStatusTypes] = useState([]);

   async function fetchData() {
      const resMart = await dispatch(getListMartOrder());
      setMartTypes(resMart?.payload);

      const resPayment = await dispatch(getListPaymentOrder());
      setPaymentTypes(resPayment?.payload);

      const resStatus = await dispatch(getListStatusOrder());
      setStatusTypes(resStatus?.payload);
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
         <CardContent sx={{ mt: 5 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={12} sx={{ mb: 5 }} useFlexGap flexWrap="wrap">
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.mart)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.search_mart} onChange={(e) => changeDataFilter({ ...dataFilter, search_mart: e.target.value })}>
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
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.payment)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.search_method} onChange={(e) => changeDataFilter({ ...dataFilter, search_method: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {paymentTypes &&
                           paymentTypes?.map((ele) => (
                              <MenuItem key={ele.payment_code} value={ele.payment_code}>
                                 {ele.payment_txt_en}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.status)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.search_status} onChange={(e) => changeDataFilter({ ...dataFilter, search_status: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {statusTypes &&
                           statusTypes?.map((ele) => (
                              <MenuItem key={ele.odvalue} value={ele.odvalue}>
                                 {ele.odtext}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" alignItems="center" gap={3}>
                  <Typography sx={{ width: 100 }}>{translate(locale, filterLocate.date)}</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        name="search_sdate"
                        defaultValue={dayjs(dataFilter.search_sdate ? dataFilter.search_sdate : moment().format("YYYY-MM-DDTHH:mm"))}
                        onChange={(e) => {
                           setFieldValue("search_sdate", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DatePicker
                        name="search_edate"
                        defaultValue={dayjs(dataFilter.search_edate ? dataFilter.search_edate : moment().format("YYYY-MM-DDTHH:mm"))}
                        onChange={(e) => {
                           setFieldValue("search_edate", e.target.value);
                        }}
                     />
                  </LocalizationProvider>
               </Stack>
               <Stack direction="row" alignItems="center" spacing={5}>
                  <Button variant="contained" onClick={handleSearch}>
                     {translate(locale, filterLocate.btnSearch)}
                  </Button>
                  <Button variant="outlined" color="inherit">
                     {translate(locale, filterLocate.btnCancel)}
                  </Button>
               </Stack>
            </Stack>
         </CardContent>
      </Card>
   );
};

export default ManagerOrderFilter;
