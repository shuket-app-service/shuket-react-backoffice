import { Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { translate } from "../../../../../@crema/services/localization/translate";
import { filterLocate } from "./helper/locate";
import { allSelect, imageSearchType, searchByType, sortStockType, statusType, stockType } from "./helper/types";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import { getProductCategory, getProductCategorySub } from "../../../../store/productManager/thunk";
import { useDispatch } from "react-redux";

const ProductRegisterFilter = ({ dataFilter, changeDataFilter, locale }) => {
   const dispatch = useDispatch();
   const [cateTypes, setCateTypes] = useState([]);
   const [cateSubTypes, setCateSubTypes] = useState([]);

   async function fetchData() {
      const response = await dispatch(getProductCategory());
      setCateTypes(response?.payload);
   }

   useEffect(() => {
      fetchData();
      return () => {};
   }, []);

   const handleChangeCategory = async (code) => {
      changeDataFilter({ ...dataFilter, category_code_status: code });
      const response = await dispatch(getProductCategorySub(code));
      setCateSubTypes(response?.payload);
   };
   return (
      <Card sx={{ borderRadius: 0, mb: 2 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography>{translate(locale, filterLocate.title)} </Typography>
         </Stack>
         <Divider />
         <CardContent sx={{ mt: 5 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={15} sx={{ mb: 5 }} useFlexGap flexWrap="wrap">
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.searchBy)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.keyword_type} onChange={(e) => changeDataFilter({ ...dataFilter, keyword_type: e.target.value })}>
                        {searchByType.map((ele) => (
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
                  <Typography>{translate(locale, filterLocate.proCategory)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.category_code_status} onChange={(e) => handleChangeCategory(e.target.value)}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {cateTypes &&
                           cateTypes?.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.proCategorySub)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.category_sub_code_status} onChange={(e) => changeDataFilter({ ...dataFilter, category_sub_code_status: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {cateSubTypes &&
                           cateSubTypes?.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.image)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.product_no_image} onChange={(e) => changeDataFilter({ ...dataFilter, product_no_image: e.target.value })}>
                        {imageSearchType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" alignItems="center" gap={3}>
                  <Typography sx={{ width: 50 }}>{translate(locale, filterLocate.regDate)}</Typography>
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
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.stock)}</Typography>
                  <TextField
                     value={dataFilter.stock_search_value}
                     type="number"
                     sx={{ width: 100 }}
                     onChange={(e) =>
                        changeDataFilter({
                           ...dataFilter,
                           stock_search_value: e.target.value,
                        })
                     }
                     hiddenLabel
                     variant="outlined"
                  />
                  <FormControl>
                     <RadioGroup defaultValue={dataFilter.option_check_stock} sx={{ display: "flex", flexDirection: "row" }}>
                        {stockType.map((ele) => (
                           <FormControlLabel key={ele.value} value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                        ))}
                     </RadioGroup>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.sortStock)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.prd_status} onChange={(e) => changeDataFilter({ ...dataFilter, prd_status: e.target.value })}>
                        {sortStockType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocate.status)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.status} onChange={(e) => changeDataFilter({ ...dataFilter, status: e.target.value })}>
                        {statusType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" alignItems="center" spacing={5}>
                  <Button variant="contained">{translate(locale, filterLocate.btnSearch)}</Button>
                  <Button variant="outlined" color="inherit">
                     {translate(locale, filterLocate.btnReset)}
                  </Button>
               </Stack>
            </Stack>
         </CardContent>
      </Card>
   );
};

export default ProductRegisterFilter;
