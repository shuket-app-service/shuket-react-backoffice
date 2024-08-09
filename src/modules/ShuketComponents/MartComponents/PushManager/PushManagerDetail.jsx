import { Dialog, DialogContentText, DialogTitle, Stack } from "@mui/material";
import React from "react";

const PushManagerDetail = ({ dataDetail, handleCloseDetail }) => {
   return (
      <Dialog open={dataDetail} onClose={handleCloseDetail} fullWidth maxWidth="sm">
         <DialogTitle></DialogTitle>
         <DialogContentText sx={{p:5}}>
            <Stack gap={5} direction={"row"} alignItems={"center"} sx={{ mb: 5 }}>
               <img src={dataDetail?.push_logo_img} />
               <p>{dataDetail?.push_title}</p>
            </Stack>
            <img src={dataDetail?.push_dt_img} style={{ display:"block", marginBottom:20}} />
            <div dangerouslySetInnerHTML={{ __html: dataDetail?.push_content }}></div>
         </DialogContentText>
      </Dialog>
   );
};

export default PushManagerDetail;
