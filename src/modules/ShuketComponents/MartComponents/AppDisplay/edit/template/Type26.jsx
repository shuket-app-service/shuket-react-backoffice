import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Type26 = ({ dataApp }) => {
   return (
      <Box>
         <Typography>{dataApp?.contentsTitle}</Typography>
         <Typography>{dataApp?.contentsSubTitle}</Typography>
         <Stack direction="row" useFlexGap flexWrap="wrap" spacing={5} sx={{ mt: 3 }}>
            {dataApp?.contentsData.map((data) => {
               return (
                  <Paper key={data.contentsID} elevation={2} sx={{ p: 3, width: "47.5%" }}>
                     <img alt="" src={data?.imageUrl?.url} />
                     <Typography sx={{ mt: 5, mb:2, width: "max-content", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data?.productName}</Typography>
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

export default Type26;
