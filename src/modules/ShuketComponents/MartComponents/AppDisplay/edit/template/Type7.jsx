import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import '../style/Type7.css'

const Type7 = ({ dataApp }) => {
   return (
      <Box>
         <Stack direction="row" alignItems="center" spacing={6} useFlexGap flexWrap="wrap">
            {dataApp?.contentsData?.map((data) => {
               return (
                  <div className="square-content" key={data?.contentsID} style={{ backgroundColor: data.color_cate }}>
                     <Typography>{data?.cateName}</Typography>
                  </div>
               );
            })}
         </Stack>
      </Box>
   );
};

export default Type7;
