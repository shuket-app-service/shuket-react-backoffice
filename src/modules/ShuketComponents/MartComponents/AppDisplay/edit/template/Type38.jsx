import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Type38 = ({ dataApp }) => {
   return (
      <Box>
         <Typography textAlign={"center"}>{dataApp?.tmpl_template_title}</Typography>
         <Stack direction="row" alignItems="center" spacing={6} useFlexGap flexWrap="wrap">
            {dataApp?.contentsData?.map((data) => {
               return (
                  <Box key={data?.contentsID} sx={{ width: "20%" }}>
                     <img src={data?.imageUrl} alt="" />
                     <Typography>{data?.name}</Typography>
                  </Box>
               );
            })}
         </Stack>
      </Box>
   );
};

export default Type38;
