import { Box, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../style/Type19.css";

const Type19 = ({ dataApp }) => {
   return (
      <Box>
         <img alt="" src={dataApp?.contentsData?.data_banner[0]?.imageUrl?.url} />
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography>{dataApp?.contentsTitle}</Typography>
            <Typography>더 보기{">>"}</Typography>
         </Stack>
         <Stack direction="row" useFlexGap flexWrap="wrap" spacing={5} sx={{ mt: 3 }}>
            {dataApp?.contentsData?.data_product.map((data) => {
               return (
                  <Paper key={data.contentsID} elevation={2} sx={{ p: 3, width: "47.5%" }}>
                     <div className="box-image">
                        <img alt="" src={data?.imageUrl?.url} />
                        {data.isoutStock ? <div className="box-out-stock">임시품절</div> : null}
                     </div>

                     <Typography sx={{ mt: 5, mb: 2, width: "max-content", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data?.productName}</Typography>
                     <Stack direction="row" justifyContent="space-between">
                        <Stack direction="column" justifyContent="space-between" sx={{ width: "45%" }}>
                           <Typography>{parseInt(data?.originalPrice) ? <b style={{ textDecorationLine: "line-through", color: "red" }}>{data?.originalPrice} 원</b> : ""}</Typography>
                           <Typography>
                              <b>{data?.retailPrice} 원</b>
                           </Typography>
                        </Stack>
                        <Stack direction="column" justifyContent="space-between" sx={{ width: "45%" }} gap={2}>
                           <Stack direction="row" justifyContent="space-between">
                              <p>-</p>
                              <input value={1} type="text" style={{ width: 40, textAlign: "center" }}></input>
                              <p>+</p>
                           </Stack>
                           {!data.isoutStock ? (
                              <Stack direction="row" justifyContent="center" sx={{ backgroundColor: "#EED259", color: "white", p: 1 }} gap={2}>
                                 <FaShoppingCart size={15} color="white" /> 담기
                              </Stack>
                           ) : (
                              <Stack direction="row" justifyContent="center" sx={{ backgroundColor: "#E1E5EC", color: "black", p: 1 }} gap={2}>
                                 품절
                              </Stack>
                           )}
                        </Stack>
                     </Stack>
                  </Paper>
               );
            })}
         </Stack>
      </Box>
   );
};

export default Type19;
