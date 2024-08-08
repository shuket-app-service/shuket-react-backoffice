import { Box, Button, Card, CardContent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PushManager = () => {
    const navigate = useNavigate()

    const gotoAdd = () =>{
        navigate("/app-management/app-push/action?type=add")
    }
   return (
      <Card sx={{ borderRadius: 0 }}>
         <CardContent>
            <Button variant="contained" onClick={gotoAdd}>Add</Button>
         </CardContent>
      </Card>
   );
};

export default PushManager;
