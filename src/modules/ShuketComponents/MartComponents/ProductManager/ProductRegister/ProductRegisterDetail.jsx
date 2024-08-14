import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
   Box,
   Checkbox,
   Divider,
   FormControl,
   FormControlLabel,
   FormLabel,
   IconButton,
   MenuItem,
   Paper,
   Radio,
   RadioGroup,
   Select,
   Stack,
   styled,
   Table,
   TableBody,
   TableCell,
   tableCellClasses,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
} from "@mui/material";
import TagsInput from "react-tagsinput";
import { convertTagsStringToArray } from "./helper/function";
import { FaRegTrashAlt } from "react-icons/fa";
import "./style/index.css";
import { translate } from "../../../../../@crema/services/localization/translate";
import { detailLocate } from "./helper/locate";
import { initialStateFilterSearchImg } from "./helper/state";
import { searchProductImage } from "../../../../store/productManager/thunk";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ProgressLoad from "../../../Common/ProgressLoad";
import { imageType, keywordType } from "./helper/types";

export default function ProductRegisterDetail({ dataDetail, handleCloseDetail, locale }) {
   const [uploadManual, setUploadManual] = useState(false);
   const [dataFilterImg, setDataFilterImg] = useState(initialStateFilterSearchImg);
   const [searchImages, setSearchImages] = useState([]);
   const [progressLoading, setProgressLoading] = useState(false);
   const [tempDetail, setTempDetail] = useState(null);
   const dispatch = useDispatch();

   console.log("tempDetail", tempDetail);

   useEffect(() => {
      if (dataDetail) {
         const customImages =  dataDetail.images.map(function (img) {
            if (img.hasOwnProperty('priority')) {
               return img
            } else {
               return { ...img, priority: 0 };
            }
         });
         setTempDetail({...dataDetail, images:customImages});
      }
   }, [dataDetail]);

   const removeImg = (image) => {
      const newImgList = tempDetail.images.filter((img) => img.thumb !== image.thumb);
      setTempDetail({ ...tempDetail, images: newImgList });
   };

   const handleSearchImg = async () => {
      setProgressLoading(true);
      const response = await dispatch(searchProductImage(dataFilterImg));
      setSearchImages(response?.payload);
      setProgressLoading(false);
   };

   const handleClickImgSearch = (img) => {
      console.log(img);
      setTempDetail({
         ...tempDetail,
         images: [
            ...tempDetail.images,
            {
               thumb: img.img_url,
               priority: 0,
            },
         ],
      });
   };
   const handleUploadImg = (e) => {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setTempDetail({
         ...tempDetail,
         images: [
            ...tempDetail.images,
            {
               thumb: objectUrl,
               priority: 0,
            },
         ],
      });
   };

   const handleChangePriority = (value, image) => {
      let newImgList = tempDetail.images.map(function (img) {
         if (img.thumb === image.thumb) {
            return { ...img, priority: value };
         } else {
            return img;
         }
      });
      const newImgListArrange = newImgList.sort((a, b) => a.priority - b.priority);
      setTempDetail({ ...tempDetail, images: newImgListArrange });
   };
   const handleClose = () => {
      handleCloseDetail();
      setUploadManual(false);
      setDataFilterImg(initialStateFilterSearchImg);
      setSearchImages([]);
   };

   return (
      <React.Fragment>
         <Dialog open={tempDetail} onClose={handleClose} fullWidth maxWidth="lg">
            <DialogTitle></DialogTitle>
            <DialogContent>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <StyledTableCell>code</StyledTableCell>
                           <StyledTableCell>name</StyledTableCell>
                           <StyledTableCell>category</StyledTableCell>
                           <StyledTableCell>price</StyledTableCell>
                           <StyledTableCell>unit</StyledTableCell>
                           <StyledTableCell>provider</StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell>{tempDetail?.code}</TableCell>
                           <TableCell>{tempDetail?.name}</TableCell>
                           <TableCell>{tempDetail?.category}</TableCell>
                           <TableCell>{tempDetail?.list_price}</TableCell>
                           <TableCell>{tempDetail?.unit}</TableCell>
                           <TableCell>{tempDetail?.provider}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
               <Stack sx={{ my: 5 }} gap={8} alignItems={"center"} direction={"row"}>
                  <Typography>{translate(locale, detailLocate.tags)} </Typography>
                  <Box sx={{ width: "100%" }}>
                     <TagsInput value={tempDetail ? convertTagsStringToArray(tempDetail?.tags) : []} />
                  </Box>
               </Stack>
               <Typography sx={{ my: 5 }}>{translate(locale, detailLocate.images)} </Typography>
               <Stack gap={10} alignItems={"center"} direction={"row"} useFlexGap flexWrap="wrap">
                  {tempDetail?.images.map((img, index) => {
                     return (
                        <Paper sx={{ p: 2 }} className="box-img" key={index}>
                           <Stack gap={2} alignItems={"center"} justifyContent={"center"} direction={"row"} useFlexGap flexWrap="wrap">
                              <Checkbox defaultChecked={img.main} />
                              <TextField
                                 size="small"
                                 sx={{ width: 100 }}
                                 InputProps={{ inputProps: { min: 0 } }}
                                 value={img?.priority}
                                 onChange={(e) => handleChangePriority(e.target.value, img)}
                                 type="number"
                              ></TextField>
                           </Stack>

                           <LazyLoadImage
                              effect="opacity"
                              wrapperProps={{
                                 style: { transitionDelay: "1s" },
                              }}
                              src={img.thumb}
                              alt=""
                              width={230}
                           />
                           <div className="btn-remove-img" style={{ top: 235, right: 5 }}>
                              <IconButton size={"small"} color="error" onClick={() => removeImg(img)}>
                                 <FaRegTrashAlt />
                              </IconButton>
                           </div>
                        </Paper>
                     );
                  })}
               </Stack>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, my: 5 }}>
                  <FormLabel>{translate(locale, detailLocate.upload)}</FormLabel>
                  <RadioGroup sx={{ display: "flex", flexDirection: "row" }} defaultValue={uploadManual} name="upload">
                     <FormControlLabel value={false} control={<Radio onChange={(e) => setUploadManual(false)} />} label={translate(locale, detailLocate.uploadAvailable)} />
                     <FormControlLabel value={true} control={<Radio onChange={(e) => setUploadManual(true)} />} label={translate(locale, detailLocate.uploadManual)} />
                  </RadioGroup>
               </FormControl>
               {uploadManual && (
                  <Stack sx={{ my: 5 }} gap={8} alignItems={"center"} direction={"row"}>
                     <Typography sx={{ my: 5 }}>{translate(locale, detailLocate.titleManual)} </Typography>

                     <label htmlFor="btnUpload" className="btnUpload">
                        {translate(locale, detailLocate.btnUpload)}
                     </label>
                     <input onChange={handleUploadImg} id="btnUpload" type="file" style={{ display: "none" }} />
                  </Stack>
               )}
               {!uploadManual && (
                  <>
                     <Stack sx={{ my: 5 }} gap={4} alignItems={"center"} direction={"row"}>
                        <Typography sx={{ my: 5 }}>{translate(locale, detailLocate.titleAvailable)} </Typography>
                        <FormControlLabel
                           control={<Checkbox defaultChecked={dataFilterImg.im_barcode} onChange={(e) => setDataFilterImg({ ...dataFilterImg, im_barcode: e.target.checked ? 1 : 0 })} />}
                           label={translate(locale, detailLocate.titleSearchBarcode)}
                        />
                        <FormControl sx={{ m: 1, width: 200 }}>
                           <Select size="small" displayEmpty={true} value={dataFilterImg.im_type} onChange={(e) => setDataFilterImg({ ...dataFilterImg, im_type: e.target.value })}>
                              {imageType.map((ele) => (
                                 <MenuItem key={ele.value} value={ele.value}>
                                    {translate(locale, ele.text)}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                           <Select size="small" displayEmpty={true} value={dataFilterImg.im_keyword} onChange={(e) => setDataFilterImg({ ...dataFilterImg, im_keyword: e.target.value })}>
                              {keywordType.map((ele) => (
                                 <MenuItem key={ele.value} value={ele.value}>
                                    {translate(locale, ele.text)}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                        <TextField size="small" type="text" value={dataFilterImg.keyword} onChange={(e) => setDataFilterImg({ ...dataFilterImg, keyword: e.target.value })}></TextField>
                        <Button variant="contained" onClick={handleSearchImg}>
                           {translate(locale, detailLocate.btnSearch)}
                        </Button>
                     </Stack>
                     <Stack sx={{ my: 5 }} gap={8} alignItems={"center"} direction={"row"} useFlexGap flexWrap="wrap">
                        {progressLoading ? (
                           <ProgressLoad></ProgressLoad>
                        ) : (
                           searchImages.map((img, index) => {
                              return (
                                 <Paper sx={{ p: 2 }} className="box-img-search" key={index} onClick={() => handleClickImgSearch(img)}>
                                    <LazyLoadImage
                                       effect="blur"
                                       wrapperProps={{
                                          style: { transitionDelay: "1s" },
                                       }}
                                       src={img.img_url}
                                       alt=""
                                       width={230}
                                    />
                                 </Paper>
                              );
                           })
                        )}
                     </Stack>
                  </>
               )}
               <Divider />
               <Stack sx={{ my: 5 }} justifyContent={"center"} alignItems={"center"} direction={"row"}>
                  <Button variant="outlined">{translate(locale, detailLocate.btnSave)}</Button>
               </Stack>
            </DialogContent>
         </Dialog>
      </React.Fragment>
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
