import { Box, Button, Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PushManagerAddEditor from "./PushManagerAddEditor";
import PushManagerAddFilter from "./PushManagerAddFilter";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import PushManagerAddForm from "./PushManagerAddForm";

const PushManagerAdd = () => {
   const { locale } = useLocaleContext();
   const [dataSelect, setDataSelect] = useState("");


   const handleSelect = (row) =>{
      setDataSelect(row)
   }
   return (
      <Box>
         <PushManagerAddFilter locale={locale} />
         <Paper sx={{ p: 5 }}>
            <Stack gap={5}>
               <PushManagerAddForm locale={locale} dataSelect={dataSelect} handleSelect={handleSelect}  />

               <PushManagerAddEditor dataSelect={dataSelect}/>
            </Stack>
         </Paper>
      </Box>
   );
};

export default PushManagerAdd;
