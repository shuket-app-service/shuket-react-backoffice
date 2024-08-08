import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PushManagerAddEditor from "./editor";

const PushManagerAdd = () => {
   const navigate = useNavigate();

   const gotoBack = () => {
      navigate("/app-management/app-push");
   };



   return (
      <Card sx={{ borderRadius: 0 }}>
         <CardContent >
            <Stack direction={"row"} justifyContent={"space-between"} sx={{ mb: 5 }}>
               <Typography></Typography>
               <Button variant="contained" onClick={gotoBack}>
                  Back
               </Button>
            </Stack>
            <PushManagerAddEditor/>
         </CardContent>
      </Card>
   );
};

export default PushManagerAdd;
