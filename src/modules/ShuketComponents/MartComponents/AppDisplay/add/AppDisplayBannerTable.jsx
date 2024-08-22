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
   TextField,
   Typography,
} from "@mui/material";
import { bannerTableLocate, headersBannerLocate, headersBannerSelectLocate, headersBannerSelectNameLocate } from "./helper/locate";
import ProgressLoad from "../../../Common/ProgressLoad";
import { initialStateBannerTable } from "./helper/state";
import { defaultSelect, limitTypes, orderType } from "./helper/types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdMenu } from "react-icons/io";

export default function AppDisplayBannerTable({ optionName, locale }) {
   const dispatch = useDispatch();

   const [headers, setHeaders] = useState([]);
   const [headerSelect, setHeaderSelect] = useState([]);

   const [progressLoading, setProgressLoading] = useState(false);

   const [screenTypes, setScreenTypes] = useState([]);
   const [bannerTypes, setBannerTypes] = useState([]);
   const [bannerSelect, setBannerSelect] = useState([]);

   const [pageCount, setPageCount] = useState(1); // page_count
   const [bannerFilter, setBannerFilter] = useState(initialStateBannerTable);
   const [cateTypes, setCateTypes] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersBannerLocate.kr);
         if (optionName) {
            setHeaderSelect(headersBannerSelectNameLocate.kr);
         } else {
            setHeaderSelect(headersBannerSelectLocate.kr);
         }
      } else {
         setHeaders(headersBannerLocate.en);
         if (optionName) {
            setHeaderSelect(headersBannerSelectNameLocate.en);
         } else {
            setHeaderSelect(headersBannerSelectLocate.en);
         }
      }
   }, [locale]);

   useEffect(() => {
      fetchData(bannerFilter);
   }, [bannerFilter]);

   const fetchData = async (params) => {
      if (!progressLoading) {
         setProgressLoading(true);
      }
      const resScreen = await dispatch(getAppScreenList());
      setScreenTypes(resScreen?.payload);

      const resBanner = await dispatch(getBannerList(params));
      setBannerTypes(resBanner?.payload?.list_data);
      setPageCount(Math.ceil(resBanner?.payload?.total_list_cnt / parseInt(resBanner.payload?.cur_per_page)));

      const resCate = await dispatch(getCateImages({ ln: locale.locale }));
      setCateTypes(resCate?.payload);

      setProgressLoading(false);
   };

   const handleSelect = (row) => {
      setBannerSelect([...bannerSelect, row]);
   };

   const handleRemove = (code) => {
      const temp = bannerSelect.filter((ele) => ele?.bnr_code !== code);
      setBannerSelect(temp);
   };

   const handleChangePage = (event, value) => {
      setBannerFilter({ ...bannerFilter, page: value });
   };

   const handleChangeData = (e) => {
      setBannerFilter((preState) => ({
         ...preState,
         [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
   };

   const handleDragEnd = (e) => {
      if (!e.destination) return;
      let tempData = Array.from(bannerSelect);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      setBannerSelect(tempData);
   };
   return (
      <Box>
         <TableContainer component={Paper} elevation={3}>
            <DragDropContext onDragEnd={handleDragEnd}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     {headerSelect.map((head) => (
                        <TableCell key={head} align="center">
                           {head}
                        </TableCell>
                     ))}
                  </TableHead>
                  <Droppable droppableId="droppable-1">
                     {(provider) => (
                        <TableBody ref={provider.innerRef} {...provider.droppableProps}>
                           {bannerSelect.map((row, index) => (
                              <Draggable key={row.bnr_code} draggableId={`${row.bnr_code}`} index={index}>
                                 {(provider) => (
                                    <TableRow {...provider.draggableProps} ref={provider.innerRef} key={row?.bnr_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                       <TableCell {...provider.dragHandleProps} align="center">
                                          <IoMdMenu size={25} />
                                       </TableCell>
                                       <TableCell align="center">{index + 1}</TableCell>
                                       <TableCell align="center">
                                          <img src={row?.bnr_image} style={{ width: 200 }} />
                                       </TableCell>
                                       <TableCell align="left">
                                          Name: {row?.bnr_name} <br />
                                          Ratio: {row?.bnr_ratio} <br />
                                          File Name: {row?.bnr_file_nm} <br />
                                          Resolution: {row?.bnr_resol}
                                       </TableCell>
                                       {optionName && (
                                          <TableCell align="left">
                                             <TextField type="text" size="small"></TextField>
                                          </TableCell>
                                       )}
                                       <TableCell align="center">
                                          <FormControl sx={{ m: 1, minWidth: 200 }}>
                                             <Select size="small">
                                                {screenTypes &&
                                                   screenTypes.map((ele) => (
                                                      <MenuItem key={ele.sc_code} value={ele.sc_code}>
                                                         {ele.sc_label}
                                                      </MenuItem>
                                                   ))}
                                             </Select>
                                          </FormControl>
                                       </TableCell>

                                       <TableCell align="center">
                                          <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                             <Button variant="outlined" color="error" onClick={() => handleRemove(row?.bnr_code)}>
                                                {translate(locale, bannerTableLocate.btnRemove)}
                                             </Button>
                                          </Stack>
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </Draggable>
                           ))}
                           {provider.placeholder}
                        </TableBody>
                     )}
                  </Droppable>
               </Table>
            </DragDropContext>
         </TableContainer>
         <Divider sx={{ my: 10 }} />
         <Stack direction={"row"} gap={5} sx={{ mb: 5 }} alignItems={"center"}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
               <Select size="small" value={bannerFilter.per_page} name="per_page" onChange={(e) => handleChangeData(e)}>
                  {limitTypes.map((ele) => (
                     <MenuItem key={ele} value={ele}>
                        {ele}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <Typography> {translate(locale, bannerTableLocate.imgCate)}</Typography>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
               <Select displayEmpty={true} size="small" value={bannerFilter.image_cate} name="image_cate" onChange={(e) => handleChangeData(e)}>
                  <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                     {translate(locale, defaultSelect.text)}
                  </MenuItem>
                  {cateTypes &&
                     cateTypes.map((ele) => (
                        <MenuItem key={ele?.cate_code} value={ele?.cate_code}>
                           {ele?.cate_name}
                        </MenuItem>
                     ))}
               </Select>
            </FormControl>
            <Typography> {translate(locale, bannerTableLocate.imgName)}</Typography>
            <TextField type="text" size="small" name="key_value" onChange={(e) => handleChangeData(e)}></TextField>
            <Typography> {translate(locale, bannerTableLocate.regDate)}</Typography>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
               <Select displayEmpty={true} size="small" value={bannerFilter.filter_order} name="filter_order" onChange={(e) => handleChangeData(e)}>
                  {orderType.map((ele) => (
                     <MenuItem key={ele.value} value={ele.value}>
                        {translate(locale, ele.text)}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Stack>
         {progressLoading ? (
            <ProgressLoad></ProgressLoad>
         ) : (
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
                                    {translate(locale, bannerTableLocate.btnSelect)}
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
         )}
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
