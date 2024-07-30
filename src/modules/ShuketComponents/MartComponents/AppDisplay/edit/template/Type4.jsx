import { Box, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../style/Type4.css";

const Type4 = ({ dataApp }) => {
   return (
      <Box>
         <Typography>{dataApp?.contentsTitle}</Typography>

         <Stack direction="row" useFlexGap flexWrap="wrap" spacing={5} sx={{ mt: 3 }}>
            {dataApp?.contentsData?.map((data) => {
               return (
                  <Paper key={data.contentsID} elevation={2} sx={{ p: 3, width: "47.5%" }}>
                     <div className="box-image">
                        <img alt="" src={data?.imageUrl?.url} />
                        {data.isoutStock ? <div className="box-out-stock">임시품절</div> : null}
                     </div>

                     <Typography sx={{ mt: 5, mb: 2, width: "max-content", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data?.productName}</Typography>
                     <Stack direction="row" justifyContent="space-between">
                        <Typography>{parseInt(data?.originalPrice) ? <b style={{ textDecorationLine: "line-through", color: "red" }}>{data?.originalPrice} 원</b> : ""}</Typography>
                        <Typography>
                           <b>{data?.retailPrice} 원</b>
                        </Typography>
                     </Stack>
                  </Paper>
               );
            })}
         </Stack>
      </Box>
   );
};

export default Type4;
