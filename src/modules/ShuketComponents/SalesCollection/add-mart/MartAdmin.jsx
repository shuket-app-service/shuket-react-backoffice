import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";
import { useDispatch } from "react-redux";
import { getGroupOption, getLevelOption } from "../../../store/users/thunk";
import { defaultSelect } from "../Helper/types";
import { checkUserAdminId } from "../../../store/salesCollection/thunk";
import TextValidate from "../../Common/TextValidate";
import { stateIDInvalid, stateIDValid } from "../Helper/state";
import TextCorrect from "../../Common/TextCorrect";

const MartAdmin = ({ locale, values, setFieldValue, errors }) => {
   const dispatch = useDispatch();
   const [groupType, setGroupType] = useState([]);
   const [levelType, setLevelType] = useState([]);
   const [errorCheckID, setErrorCheckID] = useState(null);

   useEffect(() => {
      async function fetchData() {
         const groups = await dispatch(getGroupOption());
         setGroupType(groups.payload);
         const levels = await dispatch(getLevelOption());
         setLevelType(levels.payload);
      }
      fetchData();
      return () => {};
   }, []);

   const handleCheckID = async () => {
      if (!values.u_id) {
         return;
      }
      const checkID = await dispatch(checkUserAdminId(values.u_id));
      console.log(checkID)
      if (checkID.payload) {
         setErrorCheckID(stateIDValid);
      } else {
         setErrorCheckID(stateIDInvalid);
      }
   };
   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>ID(*) </Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="u_id"
                        id="u_id"
                        value={values.u_id}
                        onChange={(e) => {
                           setFieldValue("u_id", e.target.value);
                           setErrorCheckID(null);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Button variant="outlined" onClick={handleCheckID}>
                  Check ID
               </Button>
               {errors.u_id && <TextValidate text={errors.u_id}></TextValidate>}
               {errorCheckID &&
                  (errorCheckID.value ? <TextCorrect text={translate(locale, errorCheckID.text)}></TextCorrect> : <TextValidate text={translate(locale, errorCheckID.text)}></TextValidate>)}
            </Grid>
            <Grid item xs={4}>
                  </Grid>
         </Grid>
         <Grid container spacing={5} alignItems={"center"}>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Password(*) </Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="u_pwd"
                        id="u_pwd"
                        value={values.u_pwd}
                        onChange={(e) => {
                           setFieldValue("u_pwd", e.target.value);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Password confirm(*)</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="u_pwd_conf"
                        id="u_pwd_conf"
                        value={values.u_pwd_conf}
                        onChange={(e) => {
                           setFieldValue("u_pwd_conf", e.target.value);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
         </Grid>
         <Grid container spacing={5} alignItems={"center"}>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Group</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.add_group} onChange={(e) => setFieldValue("add_group", e.target.value)}>
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {groupType &&
                           groupType.map((ele) => (
                              <MenuItem key={ele.seq} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Group</Typography>
                  <FormControl sx={{ m: 1 }}>
                     <Select size="small" displayEmpty={true} value={values.add_level} onChange={(e) => setFieldValue("add_level", e.target.value)}>
                        <MenuItem key={defaultSelect.value} value={defaultSelect.value}>
                           {translate(locale, defaultSelect.text)}
                        </MenuItem>
                        {levelType &&
                           levelType.map((ele) => (
                              <MenuItem key={ele.seq} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartAdmin;
