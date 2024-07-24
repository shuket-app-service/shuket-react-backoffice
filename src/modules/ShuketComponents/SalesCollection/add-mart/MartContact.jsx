import React from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { translate } from "../../../../@crema/services/localization/translate";

const MartContact = ({ locale, values, setFieldValue, errors }) => {
   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Name</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="contact_name"
                        id="contact_name"
                        value={values.contact_name}
                        onChange={(e) => {
                           setFieldValue("contact_name", e.target.value);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Email</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="contact_email"
                        id="contact_email"
                        value={values.contact_email}
                        onChange={(e) => {
                           setFieldValue("contact_email", e.target.value);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
            <Grid item xs={4}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Phone number</Typography>
                  <Box sx={{ maxWidth: 250 }}>
                     <TextField
                        size="small"
                        name="contact_phone"
                        id="contact_phone"
                        value={values.contact_phone}
                        onChange={(e) => {
                           setFieldValue("contact_phone", e.target.value);
                        }}
                     />
                  </Box>
               </Stack>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartContact;
