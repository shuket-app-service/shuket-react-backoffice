import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControl, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterLocate } from "./Helper/locate";
import { translate } from "../../../@crema/services/localization/translate";

const CatalogFilter = ({ dataFilter, locale }) => {
   return (
      <Card sx={{ mb: 2, borderRadius: 1 }}>
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
            <Typography> {translate(locale, filterLocate?.title)}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
               <Button type="button" color="primary" variant="contained">
                  {translate(locale, filterLocate?.btnAdd)}
               </Button>
            </Stack>
         </Stack>
         <Divider />
      </Card>
   );
};

export default CatalogFilter;
