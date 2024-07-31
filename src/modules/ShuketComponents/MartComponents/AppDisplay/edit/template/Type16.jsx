import { Box } from "@mui/material";
import React, { useState } from "react";

const Type16 = ({ dataApp }) => {
   const [data, setData] = useState(dataApp?.contentsData);

   return (
      <Box>
         <img alt="" src={data?.img_banner} style={{width:data?.img_width, height:data?.img_height}} />
      </Box>
   );
};

export default Type16;
