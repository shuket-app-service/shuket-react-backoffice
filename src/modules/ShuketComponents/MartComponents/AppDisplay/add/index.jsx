import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { translate } from "@crema/services/localization/translate";
import { Box, Checkbox, Divider, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { getAppTemplateList } from "../../../../store/appDisplay/thunk";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import "./style/index.css";
import { addLocate } from "./helper/locate";

export default function AppDisplayAdd({ openAdd, handleCloseAdd, HandleChooseTemplate, handleOpenTemplate, backdropLoading, handleStopLoading, locale }) {
   const [templateTypes, setTemplateTypes] = useState([]);
   const [templateAllTypes, setTemplateAllTypes] = useState([]);
   const [categoryTypes, setCategoryTypes] = useState([]);

   const dispatch = useDispatch();
   async function fetchData() {
      const res = await dispatch(getAppTemplateList());
      setTemplateTypes(res.payload.data);
      setTemplateAllTypes(res.payload.data);
      setCategoryTypes(res.payload.list);
      handleStopLoading(false);
   }

   useEffect(() => {
      if (openAdd) {
         fetchData();
      }
      return () => {};
   }, [openAdd]);

   const handleChangeCate = (value, code) => {
      if (code === "all") {
         if (value) {
            setTemplateTypes(templateAllTypes);
         } else {
            setTemplateTypes([]);
         }
         const temp = categoryTypes.map((ele) => {
            return { ...ele, checked: value };
         });
         setCategoryTypes(temp);
      } else {
         let tempExceptAll = categoryTypes.filter((ele) => ele.code !== "all");
         tempExceptAll = tempExceptAll.map((ele) => {
            if (ele?.code === code) {
               return { ...ele, checked: value };
            } else {
               return ele;
            }
         });
         const allChecked = tempExceptAll.every((ele) => ele.checked == true);
         const allUncheck = tempExceptAll.every((ele) => ele.checked == false);

         const temp = categoryTypes.map((ele) => {
            if (ele.code === "all" && allChecked) {
               return { ...ele, checked: true };
            } else if (ele.code === "all" && allUncheck) {
               return { ...ele, checked: false };
            } else if (ele?.code === code) {
               return { ...ele, checked: value };
            } else {
               return ele;
            }
         });
         setCategoryTypes(temp);

         let tempTemplate = [];
         for (const ele of tempExceptAll) {
            if (ele.checked) {
               const templateWithCateChecked = templateAllTypes.filter((fi) => fi.code === ele.code);
               tempTemplate.push(templateWithCateChecked);
            }
         }
         setTemplateTypes(tempTemplate.flat());
      }
   };

   const handleChangeSearch = (value) => {
      const temp = templateAllTypes.filter((fi) => fi.app_tmpl_label.includes(value));
      setTemplateTypes(temp);
   };
   const handleClose = () => {
      setTemplateTypes([]);
      setTemplateAllTypes([]);
      setCategoryTypes([]);
      HandleChooseTemplate(null)
      handleCloseAdd();
   };



   return (
      <React.Fragment>
         <Dialog fullWidth maxWidth="xl" open={openAdd && !backdropLoading} onClose={handleClose}>
            <DialogTitle variant="h4"> {translate(locale, addLocate.title)}</DialogTitle>
            <Divider sx={{ my: 3 }} />

            <DialogContent>
               <Typography sx={{ mb: 2 }}> {translate(locale, addLocate.cate)}</Typography>
               <Stack direction="row" justifyContent="start" alignItems="start" spacing={10}>
                  {categoryTypes &&
                     categoryTypes?.map((ele) => (
                        <FormControlLabel key={ele?.code} control={<Checkbox checked={ele?.checked} onChange={(e) => handleChangeCate(e.target.checked, ele?.code)} />} label={ele?.name} />
                     ))}
               </Stack>
               <Typography sx={{ my: 2 }}> {translate(locale, addLocate.name)}</Typography>
               <FormControl sx={{ my: 2 }} variant="outlined">
                  <InputLabel htmlFor="Address">Name</InputLabel>
                  <OutlinedInput
                     onChange={(e) => handleChangeSearch(e.target.value)}
                     fullWidth
                     sx={{ width: 1450 }}
                     id="name"
                     type={"text"}
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton edge="end">
                              <SearchIcon />
                           </IconButton>
                        </InputAdornment>
                     }
                     label="Name"
                  />
               </FormControl>
               <RadioGroup sx={{ display: "flex", flexDirection:"row", justifyContent: "start", alignItems: "center", flexWrap: "wrap", gap:10 }}>
                  {templateTypes &&
                     templateTypes?.map((ele) => (
                        <Stack direction="column" sx={{ width: "22%" }}>
                           <FormControlLabel value={ele?.app_tmpl_code} control={<Radio defaultChecked={false} onChange={()=>HandleChooseTemplate(ele?.app_tmpl_code)}/>} label={ele?.app_tmpl_label} />

                           <div className="image_template">
                              <img src={ele?.app_tmpl_img} />
                           </div>
                        </Stack>
                     ))}
               </RadioGroup>
               <Divider sx={{ my: 5 }} />
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button variant="contained" onClick={handleOpenTemplate}>{translate(locale, addLocate.btnSummit)}</Button>
                  <Button color="inherit" onClick={handleClose}>
                     {translate(locale, addLocate.btnClose)}
                  </Button>
               </Stack>
            </DialogContent>
         </Dialog>
      </React.Fragment>
   );
}
