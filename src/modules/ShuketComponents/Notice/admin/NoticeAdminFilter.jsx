import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterLocate } from "../helper/locate";
import { translate } from "../../../../@crema/services/localization/translate";

const NoticeAdminFilter = ({ dataFilter, locale }) => {

   return (
      <Card sx={{ mb: 5, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate.title)}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
               <Button type="button" color="primary" variant="contained">
                  {translate(locale, filterLocate.btnAdd)}
               </Button>
            </Stack>
         </Stack>
         <Divider />
      </Card>
   );
};

export default NoticeAdminFilter;
