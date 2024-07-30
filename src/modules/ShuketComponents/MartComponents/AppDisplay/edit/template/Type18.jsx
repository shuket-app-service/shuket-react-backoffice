import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const Type18 = ({ dataApp }) => {
   return (
      <Box>
         <Typography>{dataApp?.contentsTitle}</Typography>

         <Stack direction="row" justifyContent="center" alignItems="center" spacing={5} useFlexGap flexWrap="wrap" sx={{ my: 3 }}>
            {dataApp?.contentsData?.list_category.map((data) => {
               return <Typography sx={{ fontWeight: data?.checked ? "bold" : "" }}>{data?.name}</Typography>;
            })}
         </Stack>
         <Divider />

         <Stack direction="row" justifyContent="end" alignItems="center" spacing={5} useFlexGap flexWrap="wrap" sx={{ my: 3 }}>
            {dataApp?.contentsData?.list_filter.map((data) => {
               return <Typography sx={{ fontWeight: data?.checked ? "bold" : "" }}>{data?.name}</Typography>;
            })}
         </Stack>
      </Box>
   );
};

export default Type18;
