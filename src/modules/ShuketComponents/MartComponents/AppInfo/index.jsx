import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { getMartInfoApp } from "../../../store/appInfo/thunk";
import AppInfoForm from "./AppInfoForm";
import { getCityOptions, getDistrictOptions } from "../../../store/main/thunk";

export default function AppInfo() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [dataDetail, setDataDetail] = useState(null);
   const [cityType, setCityType] = useState([]);
   const [districtType, setDistrictType] = useState([]);

   const dispatch = useDispatch();

   async function fetchData() {
      const response = await dispatch(getMartInfoApp());
      setDataDetail(response?.payload); // data

      const city = await dispatch(getCityOptions());
      setCityType(city.payload);
      setLoading(false);
   }

   const handleChangeCity = async (data) => {
      setDataDetail({ ...dataDetail, city: data, district: "" });
      const district = await dispatch(getDistrictOptions(data));
      setDistrictType(district.payload);
   };

   const handleChangeNotice = (type) => {
      if (type === "+") {
         setDataDetail({ ...dataDetail, notice: [...dataDetail.notice, { id: `noti_app_${dataDetail.notice.length + 1}`, name: "" }] });
      } else if (type === "-") {
         const noticeTemp = dataDetail?.notice;
         const noticePop = noticeTemp.pop();
         setDataDetail({ ...dataDetail, notice: noticeTemp });
      }
   };

   const handleChangeData = async (e) => {
      setDataDetail((preState) => ({
         ...preState,
         [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
   };

   useEffect(() => {
      if (dataDetail && dataDetail?.city) {
         handleChangeCity(dataDetail?.city);
      }
      return () => {};
   }, [dataDetail?.city]);

   useEffect(() => {
      fetchData();
      return () => {};
   }, []);

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
               <AppInfoForm
                  dataDetail={dataDetail}
                  cityType={cityType}
                  districtType={districtType}
                  handleChangeCity={handleChangeCity}
                  handleChangeNotice={handleChangeNotice}
                  handleChangeData={handleChangeData}
                  locale={locale}
               ></AppInfoForm>
            </Box>
         )}
      </>
   );
}
