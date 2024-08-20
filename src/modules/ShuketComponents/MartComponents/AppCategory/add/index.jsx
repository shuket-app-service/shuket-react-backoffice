import { Box, Button, Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import AppCategoryAddFilter from "./AppCategoryAddFilter";
import AppCategoryAddForm from "./PushManagerAddForm";

const AppCategoryAdd = () => {
   const { locale } = useLocaleContext();
   return (
      <Box>
         <AppCategoryAddFilter locale={locale} />
         <Paper sx={{ p: 5 }}>
            <Stack gap={5}>
               <AppCategoryAddForm locale={locale}  />

            </Stack>
         </Paper>
      </Box>
   );
};

export default AppCategoryAdd;
