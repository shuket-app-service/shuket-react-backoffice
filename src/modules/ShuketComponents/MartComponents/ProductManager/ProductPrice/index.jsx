import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductPrice } from "../../../../store/productManager/thunk";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import AppLoader from "@crema/components/AppLoader";
import { initialStateFilter } from "./helper/state";
import { useDispatch } from "react-redux";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductPriceTable from "./ProductPriceTable";

const ProductManagerPrice = () => {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [pageCount, setPageCount] = useState(1); // page_count
   const [searchCount, setSearchCount] = useState(0); //search_count
   const [dataFilter, setDataFilter] = useState(initialStateFilter);

   const dispatch = useDispatch();

   async function fetchData(params) {
      const response = await dispatch(getProductPrice(params));
      setRows(response.payload?.list_product); // data
      if (response.payload?.page_count != 1) {
         setDataFilter({ limit: response.payload?.page_size, page: response.payload?.page_count });
      }
      setPageCount(Math.ceil(response.payload?.search_count / response.payload?.page_size));
      setSearchCount(response.payload?.search_count);

      setLoading(false);
   }

   useEffect(() => {
      fetchData(dataFilter);
      return () => {};
   }, []);

   //call API directly when change
   const changeDataFilterDirectly = (value) => {
      setDataFilter(value);
      fetchData(value);
   };

   
   const changeDataFilter = (value) => {
      setDataFilter(value);
   };

   const handleChangePage = (event, value) => {
      setDataFilter({ ...dataFilter, page: value });
      fetchData({ ...dataFilter, page: value });
   };
   

   return (
      <>
         {loading ? (
            <AppLoader />
         ) : (
            <Box>
                <ProductPriceFilter dataFilter={dataFilter} changeDataFilter={changeDataFilter} changeDataFilterDirectly={changeDataFilterDirectly} locale={locale}/>
               <ProductPriceTable
                  rows={rows}
                  dataFilter={dataFilter}
                  changeDataFilterDirectly={changeDataFilterDirectly}
                  pageCount={pageCount}
                  searchCount={searchCount}
                  handleChangePage={handleChangePage}
                  locale={locale}
               ></ProductPriceTable>
            </Box>
         )}
      </>
   );
};

export default ProductManagerPrice;