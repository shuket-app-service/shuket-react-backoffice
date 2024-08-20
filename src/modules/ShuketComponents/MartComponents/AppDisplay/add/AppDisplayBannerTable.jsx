import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAppScreenList, getBannerList, getCateImages } from "../../../../store/appDisplay/thunk";
import { translate } from "@crema/services/localization/translate";
import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   FormControl,
   MenuItem,
   Pagination,
   Paper,
   Select,
   Stack,
   styled,
   Table,
   TableBody,
   TableCell,
   tableCellClasses,
   TableContainer,
   TableFooter,
   TableHead,
   TablePagination,
   TableRow,
   Typography,
} from "@mui/material";
import { headersBannerLocate } from "./helper/locate";

const initialStateBanner = {
   page: 1,
   per_page: 10,
};
export default function AppDisplayBannerTable({ locale }) {
   const [headers, setHeaders] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersBannerLocate.kr);
      } else {
         setHeaders(headersBannerLocate.en);
      }
   }, [locale]);

   const [screenTypes, setScreenTypes] = useState([]);
   const [bannerTypes, setBannerTypes] = useState([]);
   const [bannerSelect, setBannerSelect] = useState([]);

   const [pageCount, setPageCount] = useState(1); // page_count
   const [bannerFilter, setBannerFilter] = useState(initialStateBanner);
   const [cateTypes, setCateTypes] = useState([]);
   const dispatch = useDispatch();
   const fetchData = async () => {
      const resScreen = await dispatch(getAppScreenList());
      setScreenTypes(resScreen?.payload);

      const resBanner = await dispatch(getBannerList(bannerFilter));
      setBannerTypes(resBanner?.payload?.list_data);
      setPageCount(Math.ceil(resBanner?.payload?.total_list_cnt / parseInt(resBanner.payload?.cur_per_page)));

      const resCate = await dispatch(getCateImages({ ln: locale.locale }));
      setCateTypes(resCate?.payload);
   };

   useEffect(() => {
      fetchData();
   }, []);

   console.log(bannerTypes);
   const handleSelect = (row) => {
      setBannerSelect([...bannerSelect, row]);
   };

   const handleRemove = (code) => {
      const temp = bannerSelect.filter((ele) => ele?.bnr_code !== code);
      setBannerSelect(temp);
   };

   const handleChangePage = (event, value) => {};

   return (
      <Box>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  {headers.map((head) => (
                     <StyledTableCell key={head} align="center">
                        {head}
                     </StyledTableCell>
                  ))}
               </TableHead>
               <TableBody>
                  {bannerSelect.map((row, index) => (
                     <TableRow key={row?.bnr_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                           <img src={row?.bnr_image} style={{ width: 200 }} />
                        </TableCell>
                        <TableCell align="left">
                           Name: {row?.bnr_name} <br />
                           Ratio: {row?.bnr_ratio} <br />
                           File Name: {row?.bnr_file_nm} <br />
                        </TableCell>
                        <TableCell align="center">{row?.bnr_resol} </TableCell>
                        <TableCell align="center">
                           {row?.c_time}
                           <br />
                           {row?.c_admin}
                        </TableCell>

                        <TableCell align="center">
                           <Stack direction={"row"} gap={2} justifyContent={"center"}>
                              <Button variant="outlined" color="error" onClick={() => handleRemove(row?.bnr_code)}>
                                 REMOVE
                              </Button>
                           </Stack>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <Divider sx={{ my: 10 }} />
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  {headers.map((head) => (
                     <StyledTableCell key={head} align="center">
                        {head}
                     </StyledTableCell>
                  ))}
               </TableHead>
               <TableBody>
                  {bannerTypes.map((row, index) => (
                     <TableRow key={row?.bnr_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                           <img src={row?.bnr_image} style={{ width: 200 }} />
                        </TableCell>
                        <TableCell align="left">
                           Name: {row?.bnr_name} <br />
                           Ratio: {row?.bnr_ratio} <br />
                           File Name: {row?.bnr_file_nm} <br />
                        </TableCell>
                        <TableCell align="center">{row?.bnr_resol} </TableCell>
                        <TableCell align="center">
                           {row?.c_time}
                           <br />
                           {row?.c_admin}
                        </TableCell>

                        <TableCell align="center">
                           <Stack direction={"row"} gap={2} justifyContent={"center"}>
                              <Button variant="outlined" onClick={() => handleSelect(row)} disabled={bannerSelect.findIndex((ele) => ele.bnr_code === row.bnr_code) != -1}>
                                 SELECT
                              </Button>
                           </Stack>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <Card sx={{ borderRadius: 0 }}>
               <CardContent>
                  <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="center" spacing={2}>
                     <Pagination count={pageCount} page={bannerFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                  </Stack>
               </CardContent>
            </Card>
         </TableContainer>
      </Box>
   );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));
