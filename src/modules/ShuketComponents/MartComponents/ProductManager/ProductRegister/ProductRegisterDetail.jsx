import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import TagsInput from "react-tagsinput";
import { convertTagsStringToArray } from "./helper/function";

export default function ProductRegisterDetail({ dataDetail, handleCloseDetail }) {
   console.log(dataDetail);

   return (
      <React.Fragment>
         <Dialog open={dataDetail} onClose={handleCloseDetail} fullWidth maxWidth="lg">
            <DialogTitle></DialogTitle>
            <DialogContent>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <StyledTableCell>code</StyledTableCell>
                           <StyledTableCell>name</StyledTableCell>
                           <StyledTableCell>category</StyledTableCell>
                           <StyledTableCell>price</StyledTableCell>
                           <StyledTableCell>unit</StyledTableCell>
                           <StyledTableCell>provider</StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell>{dataDetail?.code}</TableCell>
                           <TableCell>{dataDetail?.name}</TableCell>
                           <TableCell>{dataDetail?.category}</TableCell>
                           <TableCell>{dataDetail?.list_price}</TableCell>
                           <TableCell>{dataDetail?.unit}</TableCell>
                           <TableCell>{dataDetail?.provider}</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </TableContainer>
               <Box sx={{ my: 2 }}>
                  <TagsInput value={dataDetail ? convertTagsStringToArray(dataDetail?.tags) : []} />
               </Box>

               {dataDetail?.images.map((img, index) => {
                        <img src={dataDetail?.images[index].thumb} alt="" style={{ width: 150 }} />
                    })}
            </DialogContent>
         </Dialog>
      </React.Fragment>
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
