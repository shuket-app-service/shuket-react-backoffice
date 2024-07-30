import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const Type31 = ({ dataApp }) => {
   const [dataProduct, setDataProduct] = useState(dataApp?.contentsData[0]);
   return (
      <Box>
         <Typography textAlign={"center"}>{dataApp?.contentsTitle}</Typography>
         <Typography textAlign={"center"} sx={{my:3}}>{dataApp?.contentsSubTitle}</Typography>
         <Paper key={dataProduct?.contentsID} elevation={4} sx={{ p: 5, display:"block", margin:"auto", width: "80%" }}>
            <div className="box-image">
               <img alt="" src={dataProduct?.imageUrl?.url} />
               {dataProduct.isoutStock ? <div className="box-out-stock">임시품절</div> : null}
            </div>

            <Typography sx={{ mt: 5, mb: 2, width: "max-content", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{dataProduct?.productName}</Typography>
            <Stack direction="row" justifyContent="space-between">
               <Typography>{parseInt(dataProduct?.originalPrice) ? <b style={{ textDecorationLine: "line-through", color: "red" }}>{dataProduct?.originalPrice} 원</b> : ""}</Typography>
               <Typography>
                  <b>{dataProduct?.retailPrice} 원</b>
               </Typography>
            </Stack>
         </Paper>
      </Box>
   );
};

export default Type31;
