import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "@crema/services/localization/translate";
import { filterLocate } from "./helper/locate";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { initialStateSearch } from "./helper/state";
import { searchAddress } from "../../../../store/deliveryManager/thunk";
import ProgressLoad from "../../../Common/ProgressLoad";
import DeliveryAreaResultSearch from "./DeliveryAreaResultSearch";
export default function DelvieryAreaKakao({ openKakao, handleCloseKakao, locale }) {
   const [dataSearchFilter, setDataSearchFilter] = useState(initialStateSearch);
   const [progressLoading, setProgressLoading] = useState(false);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count

   const dispatch = useDispatch();

   const handleSearch = async (params) => {
      setProgressLoading(true);
      if(rows.length > 0){
         setRows([])
      }
      const response = await dispatch(searchAddress(params ? params : dataSearchFilter));
      setRows( !Array.isArray(response.payload?.data_list) ?  Object.values(response.payload?.data_list) : response.payload?.data_list);
      
      setPageCount(Math.ceil(response.payload?.total_count / response.payload?.limit));
      setSearchCount(response.payload?.total_count);
      setProgressLoading(false);
   };

   const handleClose = () =>{
      handleCloseKakao()
      setPageCount(1)
      setSearchCount(0)
      setDataSearchFilter(initialStateSearch)
      setRows([])
   }

   const changeDataFilterDirectly = (value) => {
      setDataSearchFilter(value);
      handleSearch(value)
   };

   console.log("res", rows);

   const handleChangePage = (event, value) => {
      setDataSearchFilter({...dataSearchFilter, page: value });
      handleSearch({...dataSearchFilter, page: value});
   };
   return (
      <React.Fragment>
         <Dialog fullWidth maxWidth="md" open={openKakao} onClose={handleClose}>
            <DialogTitle>{translate(locale, filterLocate.titleKakao)}</DialogTitle>
            <DialogContent>
               <Stack direction={"column"} gap={5}>
                  <FormControl sx={{ my: 2 }} variant="outlined">
                     <InputLabel htmlFor="Address">Address</InputLabel>
                     <OutlinedInput
                        onChange={(e) => setDataSearchFilter({ ...dataSearchFilter, address_name: e.target.value })}
                        fullWidth
                        id="Address"
                        type={"text"}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton edge="end" onClick={()=>handleSearch(null)}>
                                 <SearchIcon />
                              </IconButton>
                           </InputAdornment>
                        }
                        label="Password"
                     />
                  </FormControl>
                  {progressLoading && <ProgressLoad></ProgressLoad>}

                  {rows.length > 0 ? (
                     <DeliveryAreaResultSearch
                        rows={rows}
                        dataSearchFilter={dataSearchFilter}
                        changeDataFilterDirectly={changeDataFilterDirectly}
                        pageCount={pageCount}
                        searchCount={searchCount}
                        handleChangePage={handleChangePage}
                        locale={locale}
                     ></DeliveryAreaResultSearch>
                  ) : (
                     <div>
                        <b>TIP</b>
                        <div dangerouslySetInnerHTML={{ __html: translate(locale, filterLocate.tipKakao) }}></div>
                     </div>
                  )}
               </Stack>
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" sx={{ display: "block", margin: "auto" }} onClick={handleClose}>
                  {" "}
                  {translate(locale, filterLocate.btnClose)}
               </Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
