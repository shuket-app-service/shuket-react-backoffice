import React from "react";
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { optionalServiceType } from "../../Helper/types";
import { translate } from "../../../../@crema/services/localization/translate";

const MartOptional = ({ locale, values, setFieldValue, errors }) => {
   return (
      <Stack gap={5} sx={{ p: 10 }}>
         <Grid container spacing={5} alignItems="center">
            <Grid item xs={12}>
               <Stack direction="row" alignItems="center" gap={5}>
                  <Typography sx={{ width: 150 }}>Optional service</Typography>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                     {optionalServiceType.map((ele) => (
                        <FormControlLabel
                           control={<Checkbox defaultChecked={values[ele.filed]} onChange={(e) => setFieldValue(ele.filed, e.target.checked)} />}
                           label={`${translate(locale, ele.text)}`}
                        />
                     ))}
                  </FormGroup>
               </Stack>
            </Grid>
         </Grid>
      </Stack>
   );
};

export default MartOptional;
