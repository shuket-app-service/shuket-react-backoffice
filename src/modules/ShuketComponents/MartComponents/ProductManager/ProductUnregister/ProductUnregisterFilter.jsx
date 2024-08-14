import { Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterLocate } from "./helper/locate";
import { translate } from "../../../../../@crema/services/localization/translate";
import { allSelect, keywordType } from "./helper/types";
import { useDispatch } from "react-redux";
import { getProductCategory, getProductCategorySub } from "../../../../store/productManager/thunk";

const ProductUnregisterFilter = ({ dataFilter, changeDataFilter, changeDataFilterDirectly, locale }) => {
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
      changeDataFilter({ ...dataFilter, category_code: code });
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
                        {keywordType.map((ele) => (
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
                     <Select displayEmpty={true} value={dataFilter.category_code} onChange={(e) => handleChangeCategory(e.target.value)}>
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
                     <Select displayEmpty={true} value={dataFilter.category_sub_code} onChange={(e) => changeDataFilter({ ...dataFilter, category_sub_code: e.target.value })}>
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
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                  <FormControlLabel
                     control={<Checkbox defaultChecked={dataFilter.all_image_barcode} onChange={(e) => changeDataFilterDirectly({ ...dataFilter, all_image_barcode: e.target.checked })} />}
                     label={translate(locale, filterLocate.allBarcode)}
                  />
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                  <FormControlLabel
                     control={<Checkbox defaultChecked={dataFilter.product_brgn} onChange={(e) => changeDataFilterDirectly({ ...dataFilter, product_brgn: e.target.checked })} />}
                     label={translate(locale, filterLocate.brgn)}
                  />
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

export default ProductUnregisterFilter;
