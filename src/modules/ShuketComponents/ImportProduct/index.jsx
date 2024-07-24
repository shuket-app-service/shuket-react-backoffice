import { Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmImport, importProduct } from "../../store/importProduct/thunk";

const ImportProduct = () => {
   const dispatch = useDispatch();
   const [product, setProduct] = useState([]);
   const handleImport = async (e) => {
      const res = await dispatch(importProduct(e.target.files[0]));
      console.log("res", res.payload);
      setProduct(res.payload);
   };
   const handleSave = async() =>{
    await dispatch(confirmImport(product.filter((pro) => pro.duplicate === false)));

   }
   return (
      <Card>
         <CardContent>
            <TextField type="file" onChange={handleImport}></TextField>
            {product.length > 0 && (
               <TableContainer component={Paper} sx={{mt:3}}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <TableCell align="center">product barcode</TableCell>
                           <TableCell align="center">product name</TableCell>
                           <TableCell align="center">Duplicate </TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {product.map((pro) => (
                           <TableRow key={pro.p_barcode} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell align="center">{pro.p_barcode}</TableCell>
                              <TableCell align="center">{pro.p_name}</TableCell>
                              <TableCell align="center">{pro.duplicate ? "YES" : "NO"}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                     <TableFooter>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">
                           <Button color="primary" variant="contained" onClick={handleSave}>
                              SAVE
                           </Button>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                     </TableFooter>
                  </Table>
               </TableContainer>
            )}
         </CardContent>
      </Card>
   );
};

export default ImportProduct;
