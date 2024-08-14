import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { translate } from "../../../../../@crema/services/localization/translate";
import { filterLocateAdd } from "../helper/locate";
import BackdropLoad from "../../../Common/BackdropLoad";
import { initialStateFilter } from "../helper/state";
import { getPushDetail, getPushList } from "../../../../store/appPush/thunk";
import { useDispatch } from "react-redux";
import PushManagerTable from "../PushManagerTable";
import PushManagerDetail from "../PushManagerDetail";

const PushManagerAddForm = ({ locale, dataSelect, handleSelect }) => {
   const dispatch = useDispatch();
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count

   const [dataFilter, setDataFilter] = useState(initialStateFilter);
   const [backdropLoading, setBackdropLoading] = useState(false);
   const [dataDetail, setDataDetail] = useState(null);

   async function fetchData() {
      setBackdropLoading(true);
      const response = await dispatch(getPushList(dataFilter));

      setRows(response.payload?.list_data); // data
      setPageCount(Math.ceil(response.payload?.total_list_cnt / response.payload?.cur_per_page));
      setSearchCount(response.payload?.total_list_cnt);

      setBackdropLoading(false);
   }
   const handleChangePage = (event, value) => {
      setDataFilter({ ...dataFilter, page: value });
      fetchData({ ...dataFilter, page: value });
   };
   const changeDataFilter = (value) => {
      setDataFilter(value);
      fetchData(value);
   };

   const handleClickOpen = () => {
      fetchData();
   };

   const handleClose = (resetSelect) => {
      setRows([]);
      setDataDetail(null);
      if (resetSelect) {
         handleSelect("");
      }
   };

   async function fetchDataDetail(code, isSelect) {
      // setBackdropLoading(true);

      const response = await dispatch(getPushDetail(code));
      if (isSelect) {
         handleSelect(response.payload);
         handleClose(false);
      } else {
         setDataDetail(response.payload); // data
      }

      // setBackdropLoading(false);
   }

   const handleViewDetail = (code) => {
      fetchDataDetail(code, false);
   };

   const handleCloseDetail = () => {
      setDataDetail(null);
   };

   const handleFetchSelect = (code) => {
      fetchDataDetail(code, true);
   };

   return (
      <React.Fragment>
         {backdropLoading ? (
            <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>
         ) : (
            <Box>
               <Stack direction="row" alignItems="center" spacing={10} sx={{mb:5}}>
                  <Typography> {translate(locale, filterLocateAdd.pushMess)}</Typography>
                  <Button variant="contained" size="small" onClick={handleClickOpen}>
                     {translate(locale, filterLocateAdd.show)}
                  </Button>
               </Stack>
               {dataSelect && <img src={dataSelect?.push_dt_img} style={{width:500}} />}

               <Dialog open={rows?.length > 0} onClose={() => handleClose(true)} fullWidth maxWidth="lg">
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                     {dataDetail && <PushManagerDetail dataDetail={dataDetail} handleCloseDetail={handleCloseDetail} />}

                     <PushManagerTable
                        rows={rows}
                        dataFilter={dataFilter}
                        pageCount={pageCount}
                        searchCount={searchCount}
                        handleChangePage={handleChangePage}
                        handleViewDetail={handleViewDetail}
                        handleSelect={handleFetchSelect}
                        locale={locale}
                        isModal={true}
                     />
                  </DialogContent>
               </Dialog>
            </Box>
         )}
      </React.Fragment>
   );
};

export default PushManagerAddForm;
