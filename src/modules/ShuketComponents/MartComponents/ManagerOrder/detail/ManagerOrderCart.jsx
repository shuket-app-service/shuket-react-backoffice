import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, CardContent, Divider, FormControl, MenuItem, Pagination, Select, Stack, styled, TableFooter, TablePagination, Typography } from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { useNavigate } from "react-router-dom";
import { headerCart } from "../helper/locate";

export default function ManagerOrderCart({ rows, locale }) {
   const [headers, setHeaders] = useState([]);
   const navigate = useNavigate()

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headerCart.kr);
      } else {
         setHeaders(headerCart.en);
      }
   }, [locale]);

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     {headers.map((head) => (
                        <TableCell key={head} align="center">
                           {head}
                        </TableCell>
                     ))}
                  </TableHead>
                  <TableBody>
                     {rows.map((row, index) => (
                        <TableRow key={row?.ot_prd_barcd} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="center">{index + 1}</TableCell>       
                           <TableCell align="center">
                              <img src={row?.ot_prd_image?.[0]?.thumb} style={{width:100}} />
                           </TableCell>
                           <TableCell align="center">{row?.ot_prd_nm} </TableCell>
                           <TableCell align="center">{row?.ot_prd_qty} </TableCell>
                           <TableCell align="center">{row?.od_coupon_dc} </TableCell>
                           <TableCell align="center">{row?.ot_prd_unit} </TableCell>
                           <TableCell align="center">{row?.ot_prd_price} </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
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
