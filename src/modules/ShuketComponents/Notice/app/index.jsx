import React, { useEffect, useState } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getAppNoticeList, getInfoMartOfNotice, getListMartGsk, getListMartSg, getListMartSk, getListMartYsk } from "../../../store/notice/thunk";
import NoticeAdminTable from "./NoticeAppTable";
import { initialStateFilterApp } from "../helper/state";
import NoticeAdminFilter from "./NoticeAppFilter";
import NoticeAppMartsModal from "./NoticeAppMartsModal";
import BackdropLoad from "../../Common/BackdropLoad";

export default function NoticeApp() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(false);
   const [backdropLoading, setBackdropLoading] = useState(false);

   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilterApp);

   //mart
   const [gskList, setGskList] = useState([]);
   const [yskList, setYskList] = useState([]);
   const [skList, setSkList] = useState([]);
   const [sgList, setSgList] = useState([]);
   const [infoMartsNotice, setInfoMartNotice] = useState(null);

   const dispatch = useDispatch();

   async function fetchData(params) {
      setLoading(true);
      const response = await dispatch(getAppNoticeList(params));
      setRows(response.payload?.list_notice); // data
      if (response.payload?.page_index != 1) {
         setDataFilter({ limit: response.payload?.page_size, page: response.payload?.page_index });
      }
      setPageCount(Math.ceil(response.payload?.search_count / response.payload?.page_size));
      setSearchCount(response.payload?.search_count);

      const resGsk = await dispatch(getListMartGsk());
      setGskList(resGsk.payload); // data

      const resYsk = await dispatch(getListMartYsk());
      setYskList(resYsk.payload); // data

      const resSk = await dispatch(getListMartSk());
      setSkList(resSk.payload); // data

      const resSg = await dispatch(getListMartSg());
      setSgList(resSg.payload); // data

      setLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   const changeDataFilter = (value) => {
      setDataFilter(value);
   };

   //call API directly when change
   const changeDataFilterDirectly = (value) => {
      setDataFilter(value);
      fetchData(value);
   };

   const handleChangePage = (event, value) => {
      setDataFilter({ limit: dataFilter.limit, page: value });
      fetchData({ limit: dataFilter.limit, page: value });
   };

   const handleGetInfoMartOfNotice = async (noticeCode) => {
      setBackdropLoading(true);

      const response = await dispatch(getInfoMartOfNotice(noticeCode));
      setInfoMartNotice(response.payload?.mart_code); // data
      setBackdropLoading(false);
   };
   const handleCloseModalInfo = () => {
      setInfoMartNotice(null);
   };
   return (
      <>
         {loading ? (
            <>
               <AppLoader />
            </>
         ) : (
            <Box>
               <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>
               {infoMartsNotice && !backdropLoading && (
                     <NoticeAppMartsModal
                        infoMartsNotice={infoMartsNotice}
                        handleCloseModalInfo={handleCloseModalInfo}
                        gskList={gskList}
                        yskList={yskList}
                        skList={skList}
                        sgList={sgList}
                     ></NoticeAppMartsModal>
                  )}
               <NoticeAdminFilter dataFilter={dataFilter} changeDataFilter={changeDataFilter} locale={locale}></NoticeAdminFilter>
               <NoticeAdminTable
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  handleGetInfoMartOfNotice={handleGetInfoMartOfNotice}
                  locale={locale}
               ></NoticeAdminTable>
            </Box>
         )}
      </>
   );
}
