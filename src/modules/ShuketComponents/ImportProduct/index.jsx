import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useDispatch } from "react-redux";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { filterLocate } from "./helper/locate";
import { translate } from "../../../@crema/services/localization/translate";
import { useSelector } from "react-redux";
import { getMartsImport } from "../../store/importProduct/thunk";

export default function ImportProduct() {
   const { locale } = useLocaleContext();
   const [loading, setLoading] = useState(false);
   const [martList, setMartList] = useState([]);
   const [mart, setMart] = useState("");

   const user = useSelector((state) => state.auth.user);

   const dispatch = useDispatch();

   async function fetchData() {
      setLoading(true);
      const response = await dispatch(getMartsImport());
      setMartList(response?.payload);
      setLoading(false);
   }

   console.log(mart);
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
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Typography>{translate(locale, filterLocate.title)}</Typography>
                     <Divider sx={{ my: 5 }} />
                     <Stack direction={"column"} gap={5} sx={{ px: 30 }}>
                        <Stack direction="row" alignItems="center" gap={5}>
                           <Typography sx={{ width: 150 }}>{translate(locale, filterLocate.chooseMart)}</Typography>
                           <FormControl sx={{ m: 1, width: 200 }}>
                              <Select
                                 size="small"
                                 displayEmpty={true}
                                 value={mart}
                                 onChange={(e) => {
                                    setMart(e.target.value);
                                 }}
                              >
                                 {martList &&
                                    martList.map((ele) => (
                                       <MenuItem key={ele?.mart_code} value={ele?.mart_code}>
                                          {ele?.mart_name}
                                       </MenuItem>
                                    ))}
                              </Select>
                           </FormControl>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={5}>
                           <Typography sx={{ width: 150 }}>{translate(locale, filterLocate.importBy)}</Typography>
                           <Typography sx={{ width: 150 }}> {user?.name}</Typography>
                        </Stack>
                        {mart && (
                           <>
                              <Stack direction="row" alignItems="center" gap={5}>
                                 <Typography sx={{ width: 150 }}>{translate(locale, filterLocate.btnUpload)}</Typography>
                                 <TextField type="file">{translate(locale, filterLocate.btnUpload)}</TextField>
                              </Stack>
                              <Stack direction="row" justifyContent={"center"} alignItems="center" gap={5}>
                                <Button variant="contained">{translate(locale, filterLocate.btnImport)}</Button>
                              </Stack>
                           </>
                        )}
                     </Stack>
                  </CardContent>
               </Card>
            </Box>
         )}
      </>
   );
}
