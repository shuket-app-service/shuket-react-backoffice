import React from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";

const BackdropLoad = ({ backdropLoading }) => {
   return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropLoading}>
         <CircularProgress color="inherit" />
      </Backdrop>
   );
};

export default BackdropLoad;
