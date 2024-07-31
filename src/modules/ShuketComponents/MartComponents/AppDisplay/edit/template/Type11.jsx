import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Type11 = ({ dataApp }) => {
   return (
      <Paper elevation={2} sx={{p:5}}>
         <Stack direction="row" useFlexGap flexWrap="wrap" gap={5}>
            {dataApp?.contentsData?.map((data) => {
               return (
                  <Box sx={{width:"20%"}}>
                     <img alt="" src={data?.imageUrl} />
                     <Typography textAlign={"center"}>{data?.cateName}</Typography>
                  </Box>
               );
            })}
         </Stack>
      </Paper>
   );
};

export default Type11;
