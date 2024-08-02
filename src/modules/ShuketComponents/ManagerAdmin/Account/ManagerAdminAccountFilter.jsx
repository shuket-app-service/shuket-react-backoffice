import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Popover, Select, Stack, TextField, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";
import { filterLocateAccount } from "../helper/locate";
import { allSelect, dateType, userType } from "../helper/types";
import DateRangePickerValue from "../../Common/DateRangePicker";
import dayjs from "dayjs";
import moment from "moment";

const ManagerAdminAccountFilter = ({ dataFilter, levels, groups, handleSearch, handleReset, changeDataFilter, locale }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [choseDateType, setChooseDateType] = useState("");
   const [dataCustom, setDataCustom] = useState([dayjs(moment().startOf("month").format("YYYY-MM-DD")), dayjs(moment().endOf("month").format("YYYY-MM-DD"))]);

   const openPopoverDate = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const closePopoverDate = () => {
      setAnchorEl(null);
      setChooseDateType("");
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;

   const handleSetDate = (ele) => {
      if (ele.value === "custom") {
         setChooseDateType(ele.value);
      } else {
         setChooseDateType(ele.value);
         changeDataFilter({
            ...dataFilter,
            date_start: ele.date_start,
            date_end: ele.date_end,
         });
         setAnchorEl(null);
      }
   };

   const changeDateCustom = (newValue) => {
      setDataCustom(newValue);
      if (newValue?.[0] && newValue?.[1]) {
         changeDataFilter({
            ...dataFilter,
            date_start: moment(newValue?.[0].$d).format("DD/MM/YYYY"),
            date_end: moment(newValue?.[1].$d).format("DD/MM/YYYY"),
         });
      }
   };
   const handleSetCustomDate = () => {
      console.log(dataCustom);
      console.log(dataFilter);

      setAnchorEl(null);
   };
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography>{translate(locale, filterLocateAccount?.title)} </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
               <Button type="button" color="primary" variant="contained">
                  {translate(locale, filterLocateAccount?.btnAdd)}
               </Button>
            </Stack>
         </Stack>

         <Divider />
         <CardContent sx={{ mt: 5 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={25} sx={{ mb: 5 }}>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography> {translate(locale, filterLocateAccount?.searchBy)} </Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select
                        value={dataFilter.keyword_type}
                        onChange={(e) =>
                           changeDataFilter({
                              ...dataFilter,
                              keyword_type: e.target.value,
                           })
                        }
                     >
                        {userType.map((ele) => (
                           <MenuItem key={ele.value} value={ele.value}>
                              {translate(locale, ele.text)}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
                  <TextField
                     value={dataFilter.keyword_value}
                     onChange={(e) =>
                        changeDataFilter({
                           ...dataFilter,
                           keyword_value: e.target.value,
                        })
                     }
                     hiddenLabel
                     variant="outlined"
                  />
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocateAccount?.level)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.level} onChange={(e) => changeDataFilter({ ...dataFilter, level: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {levels &&
                           levels.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocateAccount?.group)}</Typography>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                     <Select displayEmpty={true} value={dataFilter.group} onChange={(e) => changeDataFilter({ ...dataFilter, group: e.target.value })}>
                        <MenuItem key={allSelect.value} value={allSelect.value}>
                           {translate(locale, allSelect.text)}
                        </MenuItem>
                        {groups &&
                           groups.map((ele) => (
                              <MenuItem key={ele.code} value={ele.code}>
                                 {ele.name}
                              </MenuItem>
                           ))}
                     </Select>
                  </FormControl>
               </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={25}>
               <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                  <Typography>{translate(locale, filterLocateAccount?.date)}</Typography>
                  <TextField type="text" value={dataFilter?.date_start + " - " + dataFilter?.date_end} onClick={openPopoverDate} aria-describedby={id} sx={{ width: 250 }}></TextField>
                  <Popover
                     id={id}
                     open={open}
                     anchorEl={anchorEl}
                     onClose={closePopoverDate}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                     }}
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                     }}
                  >

                     <Stack sx={{ p: 5 }} gap={5}>
                        {dateType.map((ele) => {
                           return (
                              <Button variant="outlined" color="primary"  onClick={() => handleSetDate(ele)}>
                                 {" "}
                                 {translate(locale, ele.text)}
                              </Button>
                           );
                        })}
                        {choseDateType === "custom" && <DateRangePickerValue dataCustom={dataCustom} changeDateCustom={changeDateCustom}></DateRangePickerValue>}
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                           <Button variant="contained" onClick={handleSetCustomDate}>
                              {translate(locale, filterLocateAccount?.btnSummit)}
                           </Button>
                           <Button variant="outlined" color="inherit" onClick={closePopoverDate}>
                              {translate(locale, filterLocateAccount?.btnCancel)}
                           </Button>
                        </Stack>
                     </Stack>
                  </Popover>
               </Stack>
               <Stack direction="row" alignItems="center" spacing={5}>
                  <Button variant="contained" onClick={handleSearch}>
                     {translate(locale, filterLocateAccount?.btnSearch)}
                  </Button>
                  <Button variant="outlined" color="inherit" onClick={handleReset}>
                     {translate(locale, filterLocateAccount?.btnCancel)}
                  </Button>
               </Stack>
            </Stack>
         </CardContent>
      </Card>
   );
};

export default ManagerAdminAccountFilter;
