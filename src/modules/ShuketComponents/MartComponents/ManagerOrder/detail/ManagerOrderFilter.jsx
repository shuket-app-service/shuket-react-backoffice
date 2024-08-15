import React from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { filterLocateDetail } from "../helper/locate";
import { translate } from "@crema/services/localization/translate";
const ManagerOrderFilter = ({ dataDetail, locale }) => {
   const navigate = useNavigate();
   const gotoBack = () => {
      navigate("/marts/manage-order-moa-service/list");
   };
   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5 }}>
               <Typography>
                  {translate(locale, filterLocateDetail.title)}{" "}
                  <b>
                     ( {dataDetail?.od_code} | {dataDetail?.od_date} )
                  </b>
               </Typography>
               <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Button variant="outlined" color="error">
                     {translate(locale, filterLocateDetail.btnCancel)}
                  </Button>
                  <Button variant="contained" onClick={gotoBack}>
                     {translate(locale, filterLocateDetail.btnBack)}
                  </Button>
               </Stack>
            </Stack>
         </CardContent>
      </Card>
   );
};

export default ManagerOrderFilter;
