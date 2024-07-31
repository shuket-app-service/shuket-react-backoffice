import React from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { subscriptionType } from "../../Common/types";
import { translate } from "../../../../@crema/services/localization/translate";

const MartSubcription = ({ locale, values, setFieldValue, errors }) => {
   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={4}>
               <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Typography >Subscription</Typography>
                  <RadioGroup
                     defaultValue={values.s_type}
                     name="s_type"
                     onChange={(e) => {
                        setFieldValue("s_type", e.target.value);
                     }}
                     sx={{ display: "flex", flexDirection: "row" }}
                  >
                     {subscriptionType.map((ele) => (
                        <FormControlLabel key={ele.value} value={ele.value} control={<Radio />} label={translate(locale, ele.text)} />
                     ))}
                  </RadioGroup>
               </FormControl>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartSubcription;
