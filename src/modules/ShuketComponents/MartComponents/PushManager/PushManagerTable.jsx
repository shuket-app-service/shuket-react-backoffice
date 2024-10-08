import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { filterLocate, headersLocate } from "./helper/locate";
import { translate } from "../../../../@crema/services/localization/translate";
import { limitType } from "./helper/types";

export default function PushManagerTable({ rows, dataFilter, changeDataFilterDirectly, pageCount, searchCount, handleChangePage, handleViewDetail, handleSelect, locale, isModal }) {
   const [headers, setHeaders] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headersLocate.kr);
      } else {
         setHeaders(headersLocate.en);
      }
   }, [locale]);

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
               {!isModal && (
                  <Card sx={{ borderRadius: 0 }}>
                     <CardContent>
                        <Stack sx={{ mt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                           <Stack direction="row" alignItems={"center"} gap={2}>
                              <FormControl sx={{ m: 1, minWidth: 100 }}>
                                 <Select
                                    size="small"
                                    value={dataFilter.per_page}
                                    onChange={(e) =>
                                       changeDataFilterDirectly({
                                          ...dataFilter,
                                          per_page: e.target.value,
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

                           <Pagination count={pageCount} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                        </Stack>
                     </CardContent>
                  </Card>
               )}

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
                        <TableRow key={row?.push_msg_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="center">{index + 1}</TableCell>
                           <TableCell align="center">{row?.push_title} </TableCell>
                           <TableCell align="center">{row?.push_reg_date} </TableCell>
                           <TableCell align="center">{row?.push_deli_date} </TableCell>
                           <TableCell align="center" sx={{ color: row?.push_msg_status_cl }}>
                              {row?.push_msg_status_desc}{" "}
                           </TableCell>
                           <TableCell align="center">{row?.sendcount} </TableCell>

                           <TableCell align="center">
                              <Stack direction={"row"} gap={2} justifyContent={"center"}>
                                 <Button variant="outlined" color="info" onClick={() => handleViewDetail(row?.push_msg_code)}>
                                    {" "}
                                    {translate(locale, filterLocate.btnDetail)}
                                 </Button>
                                 {isModal && (
                                    <Button variant="outlined" color="info" onClick={() => handleSelect(row?.push_msg_code)}>
                                       {translate(locale, filterLocate.btnSelect)}
                                    </Button>
                                 )}
                              </Stack>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Divider />
               <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                     <Stack sx={{ mt: 5 }} direction="row" justifyContent="end" alignItems="center" spacing={2}>
                        <Pagination count={pageCount} page={dataFilter.page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
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
