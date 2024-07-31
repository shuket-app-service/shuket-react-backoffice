import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
 } from "@mui/material";
 import React, { useState } from "react";
 import { appType, martType, statusType } from "../Common/types";
 import { useNavigate } from "react-router-dom";
 import { translate } from "../../../@crema/services/localization/translate";
 import { filterLocate } from "./locate";
 
 const ManagerImageFilter = ({ dataFilter, changeDataFilter, handleSearch, handleReset, locale }) => {
    const navigate = useNavigate();
    const gotoAddMartPage = () => {
       navigate("add-mart");
    };
    return (
       <Card sx={{ mb: 5, borderRadius: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
             <Typography>{translate(locale, filterLocate.title)} </Typography>
             <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Button type="button" color="primary" variant="contained" onClick={gotoAddMartPage}>
                   {translate(locale, filterLocate.btnAdd)}
                </Button>
             </Stack>
          </Stack>
 
          <Divider />
          <CardContent sx={{ mt: 5 }}>
             <Stack direction="row" justifyContent="center" alignItems="center" spacing={25} sx={{ mb: 5 }}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                   <Typography> {translate(locale, filterLocate.searchBy)} </Typography>
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
                         {martType.map((ele) => (
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
                   <Typography>{translate(locale, filterLocate.status)}</Typography>
                   <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <Select
                         displayEmpty={true}
                         value={dataFilter.status}
                         onChange={(e) => changeDataFilter({ ...dataFilter, status: e.target.value })}
                      >
                         {statusType.map((ele) => (
                            <MenuItem key={ele.value} value={ele.value}>
                               {translate(locale, ele.text)}
                            </MenuItem>
                         ))}
                      </Select>
                   </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
                   <Typography>{translate(locale, filterLocate.typeApp)}</Typography>
                   <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <Select
                         displayEmpty={true}
                         value={dataFilter.app_type}
                         onChange={(e) => changeDataFilter({ ...dataFilter, app_type: e.target.value })}
                      >
                         {appType.map((ele) => (
                            <MenuItem key={ele.value} value={ele.value}>
                               {translate(locale, ele.text)}
                            </MenuItem>
                         ))}
                      </Select>
                   </FormControl>
                </Stack>
             </Stack>
             <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={25}>
                <Box>
                   <FormControlLabel
                      control={
                         <Checkbox
                            name={`${translate(locale, filterLocate.UseTdcOrder)}`}
                            checked={dataFilter.mart_use_sync_order}
                            onChange={(e) =>
                               changeDataFilter({
                                  ...dataFilter,
                                  mart_use_sync_order: e.target.checked,
                               })
                            }
                         />
                      }
                      label={`${translate(locale, filterLocate.UseTdcOrder)}`}
                      />
                         <FormControlLabel
                      control={
                         <Checkbox
                         name={`${translate(locale, filterLocate.UseStock)}`}
                         checked={dataFilter.mart_with_stock}
                            onChange={(e) =>
                               changeDataFilter({
                                  ...dataFilter,
                                  mart_with_stock: e.target.checked,
                               })
                            }
                         />
                      }
                      label={`${translate(locale, filterLocate.UseStock)}`}
                      />
                </Box>
                 <div></div>
                <Stack direction="row" alignItems="center" spacing={5}>
                   <Button variant="contained" onClick={handleSearch}>
                      {translate(locale, filterLocate.btnSearch)}
                   </Button>
                   <Button variant="outlined" color="inherit" onClick={handleReset}>
                   {translate(locale, filterLocate.btnCancel)}
                   </Button>
                </Stack>
             </Stack>
          </CardContent>
       </Card>
    );
 };
 
 export default ManagerImageFilter;
 