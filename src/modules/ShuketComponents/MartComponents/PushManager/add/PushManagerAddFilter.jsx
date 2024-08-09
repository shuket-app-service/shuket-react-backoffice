import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "../../../../../@crema/services/localization/translate";
import {  filterLocateAdd } from "../helper/locate";

const PushManagerAddFilter = ({locale}) => {
   const navigate = useNavigate();

   const gotoBack = () => {
      navigate("/app-management/app-push");
   };
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, }}>
               <Typography> {translate(locale, filterLocateAdd.title)}</Typography>
               <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Button variant="contained" onClick={gotoBack}>
                     Back
                  </Button>
               </Stack>
            </Stack>
         </CardContent>
      </Card>
   );
};

export default PushManagerAddFilter;
