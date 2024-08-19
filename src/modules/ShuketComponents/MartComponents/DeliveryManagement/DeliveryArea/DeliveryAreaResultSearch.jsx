import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { filterLocate, headersSearchLocate } from "./helper/locate";
import { limitType } from "./helper/types";
import "./style/index.css";

export default function DeliveryAreaResultSearch({ rows, dataSearchFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, locale }) {
   const [headers, setHeaders] = useState([]);
   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersSearchLocate.kr);
      } else {
         setHeaders(headersSearchLocate.en);
      }
   }, [locale]);

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Stack direction="row" alignItems={"center"} gap={2}>
                           <Typography>Total: <b>{searchCount}</b></Typography>
                           <FormControl sx={{ m: 1, minWidth: 100 }}>
                              <Select
                                 size="small"
                                 value={dataSearchFilter.limit}
                                 onChange={(e) =>
                                    changeDataFilterDirectly({
                                       ...dataSearchFilter,
                                       limit: e.target.value,
                                    })
                                 }
                              >
                                 {limitType.map((ele) => (
                                    <MenuItem key={ele} value={ele}>
                                       {ele}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                           <Typography>{translate(locale, filterLocate.limit)} </Typography>
                        </Stack>

                        <Pagination count={pageCount} page={dataSearchFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                     </Stack>
                  </CardContent>
               </Card>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     {headers.map((head) => (
                        <StyledTableCell key={head} align="center">
                           {head}
                        </StyledTableCell>
                     ))}
                  </TableHead>
                  <TableBody>
                     {rows.map((row, index) => (
                        <TableRow key={row?.mart_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="left">
                              {row?.ZONE_NO}
                              <br />
                              Road Address: {row?.ADDRESS_NAME2}
                              <br />
                              Address: {row?.ADDRESS_NAME}
                           </TableCell>
                           <TableCell align="center">
                              <Button variant="outlined">View map</Button>
                           </TableCell>
                           <TableCell align="center">
                              <Checkbox></Checkbox>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Divider />
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="center" spacing={2}>
                        <Pagination count={pageCount} page={dataSearchFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                     </Stack>
                  </CardContent>
               </Card>
            </TableContainer>
         </Box>
      </>
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
