import { Box } from "@mui/material";
import React, { useState } from "react";

const Type1 = ({ dataApp }) => {
   const [data, setData] = useState(dataApp?.contentsData[0]);

   return (
      <Box>
         <img alt="" src={data?.imageUrl} />
      </Box>
   );
};

export default Type1;
