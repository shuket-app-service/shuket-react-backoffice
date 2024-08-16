import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   FormControl,
   FormControlLabel,
   FormGroup,
   MenuItem,
   Pagination,
   Select,
   Stack,
   styled,
   Switch,
   TableFooter,
   TablePagination,
   Typography,
} from "@mui/material";
import { translate } from "@crema/services/localization/translate";
import { filterLocate, headerCancelLocate,  } from "./helper/locate";

export default function ManagerOrderTableCancel({ rows, locale }) {
   const [headers, setHeaders] = useState([]);

   useEffect(() => {
      if (locale.locale == "ko") {
         setHeaders(headerCancelLocate.kr);
      } else {
         setHeaders(headerCancelLocate.en);
      }
   }, [locale]);

   return (
      <>
         <Box>
            <TableContainer component={Paper}>
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
                        <TableRow key={row?.od_code} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                           <TableCell align="center">{index + 1}</TableCell>
                           <TableCell align="center">{row?.order_code}</TableCell>
                           <TableCell align="center">{row?.mid} </TableCell>
                           <TableCell align="center">{row?.price} </TableCell>
                           <TableCell align="center">{row?.ot_prd_cd} </TableCell>
                           <TableCell align="center">{row?.ot_prd_barcode} </TableCell>
                           <TableCell align="center">{row?.qty_text} </TableCell>
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
      backgroundColor: "#F1F4F7",
      color: theme.palette.common.black,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));
