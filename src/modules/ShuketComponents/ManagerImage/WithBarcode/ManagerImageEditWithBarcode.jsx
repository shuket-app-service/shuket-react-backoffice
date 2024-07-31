import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const ManagerImageEditWithBarcode = ({ row, closeCollapse }) => {
   const [tagsEdit, setTagsEdit] = useState(generateTag(row?.prd_img_tags));

   //convert tag string => array
   function generateTag(tages) {
      return tages.split("#").filter(Boolean);
   }

   // delete tag
   const handleChangeTag = (tages) => {
      setTagsEdit(tages);
   };

   return (
      <Paper elevation={1} sx={{ p: 10 }}>
         <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Stack sx={{ width: "70%" }} direction="column" justifyContent="center" spacing={3}>
               <TextField type="text" defaultValue={row.prd_img_name}></TextField>
               <TagsInput value={tagsEdit} onChange={handleChangeTag} />
               <Box>
                  <Button variant="outlined" sx={{mr:3}}> Save </Button>
                  <Button variant="outlined" color="error" onClick={closeCollapse}>
                     {" "}
                     Cancel{" "}
                  </Button>
               </Box>
            </Stack>
            <Box sx={{ width: "30%" }}>
               <img style={{ width: 250 }} src={row.prd_img_url} alt="" />
            </Box>
         </Stack>
      </Paper>
   );
};

export default ManagerImageEditWithBarcode;
