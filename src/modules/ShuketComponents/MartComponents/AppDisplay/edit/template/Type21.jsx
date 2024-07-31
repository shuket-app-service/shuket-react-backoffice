import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import '../style/Type21.css'
const Type21 = ({ dataApp }) => {
   return (
      <Paper elevation={2} sx={{p:5}}>
         <Stack direction="row" useFlexGap flexWrap="wrap" gap={5}>
            {dataApp?.contentsData?.map((data) => {
               return (
                  <Box sx={{width:"15%"}}>
                     <img className="image-category" alt="" src={data?.imageUrl} />
                     <Typography variant="h6" textAlign={"center"}>{data?.cateName}</Typography>
                  </Box>
               );
            })}
         </Stack>
      </Paper>
   );
};

export default Type21;
