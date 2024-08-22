import {
   Box,
   Button,
   Checkbox,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Divider,
   FormControl,
   FormControlLabel,
   MenuItem,
   Radio,
   RadioGroup,
   Select,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterLocateAdd } from "../helper/locate";
import BackdropLoad from "../../../Common/BackdropLoad";
import { initialStateAdd, initialStateFilter } from "../helper/state";
import { getPushList } from "../../../../store/appPush/thunk";
import { useDispatch } from "react-redux";
import { translate } from "@crema/services/localization/translate";
import { categoryAddType, defaultSelect, imgAddType, templateAddType } from "../helper/types";
import SwitchStatus from "../../../Common/SwitchStatus";
import { getProductCategory } from "../../../../store/productManager/thunk";
import { getAppMidCategory } from "../../../../store/appCategory/thunk";

const AppCategoryAddForm = ({ locale }) => {
   const dispatch = useDispatch();

   const [dataAdd, setDataAdd] = useState(initialStateAdd);
   const [backdropLoading, setBackdropLoading] = useState(false);
   const [categoryType, setCategoryType] = useState([]);
   const [categoryMidType, setCategoryMidType] = useState([]);
   const [imgPreview, setImgPreview] = useState(null);

   async function fetchData() {
      setBackdropLoading(true);
      const response = await dispatch(getProductCategory());

      setCategoryType(response?.payload); // data
      setBackdropLoading(false);
   }

   useEffect(() => {
      fetchData();
   }, []);

   const handleChangeImg = (e) => {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setImgPreview(objectUrl);
   };

   const handleSelectCate = async (value) => {
      const response = await dispatch(getAppMidCategory(value));
      setCategoryMidType(response?.payload); // data
      setDataAdd({ ...dataAdd, cate_name: value });
   };

   const handleChangeData = async (e) => {
      setDataAdd((preState) => ({
         ...preState,
         [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
   };
   const handleSubdataCheckedParent = (subdata, checkedParent) => {
      const newSubdata = subdata.map((ele) => {
         return { ...ele, SUB_CAT_SET_USE: checkedParent };
      });

      return newSubdata;
   };
   const handleSetAllMid = () => {
      let temp = [];
      const checkAll = categoryMidType.every((cate) => cate.MID_CAT_SET_USE === true);
      if (checkAll) {
         temp = categoryMidType.map((ele) => {
            return { ...ele, MID_CAT_SET_USE: false, SUBDATA: handleSubdataCheckedParent(ele.SUBDATA, false) };
         });
      } else {
         temp = categoryMidType.map((ele) => {
            return { ...ele, MID_CAT_SET_USE: true, SUBDATA: handleSubdataCheckedParent(ele.SUBDATA, true) };
         });
      }
      setCategoryMidType(temp);
   };

   const handleCheckedMid = (value, code) => {
      let temp = categoryMidType.map((ele) => {
         if (ele?.MID_CAT_CODE === code) {
            return { ...ele, MID_CAT_SET_USE: value, SUBDATA: handleSubdataCheckedParent(ele.SUBDATA, value) };
         } else {
            return ele;
         }
      });
      setCategoryMidType(temp);
   };

   const handleCheckedMidChild = (value, parentCode, code) => {
      const parent = categoryMidType.find((fi) => fi.MID_CAT_CODE == parentCode);
      const subdata = parent?.SUBDATA?.map((ele) => {
         if (ele?.SUB_CAT_CODE === code) {
            return { ...ele, SUB_CAT_SET_USE: value };
         } else {
            return ele;
         }
      });

      let temp = categoryMidType.map((ele) => {
         if (ele?.MID_CAT_CODE === parentCode) {
            return { ...ele, SUBDATA: subdata };
         } else {
            return ele;
         }
      });
      setCategoryMidType(temp);
   };
   console.log(dataAdd);
   return (
      <React.Fragment>
         {backdropLoading ? (
            <BackdropLoad backdropLoading={backdropLoading}></BackdropLoad>
         ) : (
            <Box sx={{ px: 20 }}>
               <Stack direction="column" spacing={5} sx={{ mb: 5 }}>
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                     <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.cateType)}</Typography>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <RadioGroup name="ac_cate_type" defaultValue={dataAdd?.ac_cate_type} sx={{ display: "flex", flexDirection: "row" }}>
                           {categoryAddType?.map((ele) => (
                              <FormControlLabel value={ele.value} key={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                           ))}
                        </RadioGroup>
                     </FormControl>{" "}
                  </Stack>
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                     <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.templateType)}</Typography>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <RadioGroup name="ac_cate_type" defaultValue={dataAdd?.template_cate} sx={{ display: "flex", flexDirection: "row" }}>
                           {templateAddType?.map((ele) => (
                              <FormControlLabel value={ele.value} key={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                           ))}
                        </RadioGroup>
                     </FormControl>{" "}
                  </Stack>
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                     <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.category)}</Typography>
                     <FormControl sx={{ m: 1, minWidth: 250 }}>
                        <Select name="cate_name" displayEmpty={true} value={dataAdd?.cate_name} onChange={(e) => handleSelectCate(e.target.value)}>
                           <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                              {translate(locale, defaultSelect.text)}
                           </MenuItem>
                           {categoryType &&
                              categoryType.map((ele) => (
                                 <MenuItem key={ele.code} value={ele.code}>
                                    {ele.name}
                                 </MenuItem>
                              ))}
                        </Select>
                     </FormControl>
                  </Stack>
                  {dataAdd?.cate_name && (
                     <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                        <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.mid)}</Typography>
                        <Checkbox name="use_mid_cate" defaultChecked={dataAdd?.use_mid_cate} onChange={(e) => handleChangeData(e)} />
                     </Stack>
                  )}

                  {dataAdd?.cate_name && dataAdd?.use_mid_cate && categoryMidType.length && (
                     <Stack direction="row" justifyContent="start" alignItems="start" spacing={10}>
                        <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.midApp)}</Typography>
                        <Stack direction="column" spacing={1}>
                           <FormControlLabel control={<Checkbox defaultChecked={false} />} label="ALL" onClick={handleSetAllMid} />
                           <Divider />
                           <Stack sx={{ maxWidth: 500 }} direction="row" justifyContent="start" alignItems="start" spacing={1} useFlexGap flexWrap="wrap">
                              {categoryMidType?.map((ele) => (
                                 <Box>
                                    <FormControlLabel
                                       key={ele?.MID_CAT_CODE}
                                       control={<Checkbox checked={ele?.MID_CAT_SET_USE} />}
                                       label={ele?.MID_CAT_NAME}
                                       onChange={(e) => handleCheckedMid(e.target.checked, ele?.MID_CAT_CODE)}
                                    />
                                    {ele?.MID_CAT_SET_USE && (
                                       <>
                                          <Divider />
                                          <Stack direction="column" justifyContent="start" alignItems="start" spacing={1} useFlexGap flexWrap="wrap">
                                             {ele?.SUBDATA.map((child) => (
                                                <Box>
                                                   <FormControlLabel
                                                      key={child?.SUB_CAT_CODE}
                                                      control={<Checkbox checked={child?.SUB_CAT_SET_USE} />}
                                                      label={child?.SUB_CAT_NAME}
                                                      onChange={(e) => handleCheckedMidChild(e.target.checked, ele?.MID_CAT_CODE, child?.SUB_CAT_CODE)}
                                                   />
                                                </Box>
                                             ))}
                                          </Stack>
                                       </>
                                    )}
                                 </Box>
                              ))}
                           </Stack>
                        </Stack>
                     </Stack>
                  )}
                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                     <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.imgUse)}</Typography>
                     <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <RadioGroup name="ac_cate_type" defaultValue={dataAdd?.ac_cate_img_use_flg} sx={{ display: "flex", flexDirection: "row" }} onChange={(e) => handleChangeData(e)}>
                           {imgAddType?.map((ele) => (
                              <FormControlLabel value={ele.value} key={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                           ))}
                        </RadioGroup>
                     </FormControl>{" "}
                  </Stack>
                  {dataAdd?.ac_cate_type === "C" && (
                     <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                        <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.img)}</Typography>
                        <Box sx={{ maxWidth: 250 }}>
                           <TextField type="file" onChange={handleChangeImg} size="small" sx={{ mb: 2 }}></TextField>
                           {imgPreview && <img src={imgPreview} />}
                        </Box>
                     </Stack>
                  )}

                  <Stack direction="row" justifyContent="start" alignItems="center" spacing={10}>
                     <Typography sx={{ minWidth: 250, textAlign: "right" }}>{translate(locale, filterLocateAdd.imgUse)}</Typography>
                     <SwitchStatus status={dataAdd?.ac_cate_st_logic} handleChangeStatus={() => {}}></SwitchStatus>
                  </Stack>
                  <Stack sx={{ mb: 5 }} direction="row" justifyContent="center" alignItems="center">
                     <Button type="submit" color="primary" variant="contained">
                        {translate(locale, filterLocateAdd.title)}{" "}
                     </Button>
                  </Stack>
               </Stack>
            </Box>
         )}
      </React.Fragment>
   );
};

export default AppCategoryAddForm;
