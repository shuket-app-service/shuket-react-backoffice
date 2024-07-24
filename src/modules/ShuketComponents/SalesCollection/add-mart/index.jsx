import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import MartInfo from "./MartInfo";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import MartAppSetting from "./MartAppSetting";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MartPayment from "./MartPayment";
import { initialStateAdd } from "../../Helper/state";
import MartDelivery from "./MartDelivery";
import MartContact from "./MartContact";
import MartAdmin from "./MartAdmin";
import MartSubcription from "./MartSubcription";
import MartBilling from "./MartBilling";
import MartOptional from "./MartOptional";

const validationSchema = Yup.object().shape({
   name: Yup.string().required("Name cannot be empty"),
   u_id: Yup.string().required("Account ID cannot be empty"),
});

const AddMart = () => {
   const navigate = useNavigate();

   const { locale } = useLocaleContext();
   const [tab, setTab] = React.useState("Basic information");

   const handleChange = (event, tabValue) => {
      setTab(tabValue);
   };
   const gotoBack = () => {
      navigate("/service/sales-collection");
   };
   const handleSave = (values) => {
      console.log(values);
   };
   return (
      <TabContext value={tab}>
         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
               <Tab label="Basic information" value="Basic information" />
               <Tab label="App setting" value="App setting" />
               <Tab label="Payment Method" value="Payment Method" />
               <Tab label="Delivery Setting" value="Delivery Setting" />
               <Tab label="Contact information" value="Contact information" />
               <Tab label="Admin account information" value="Admin account information" />
               <Tab label="Subscription" value="Subscription" />
               <Tab label="Billing info" value="Billing info" />
               <Tab label="Optional service" value="Optional service" />

            </TabList>
         </Box>
         <Card sx={{mt:1}}>
            <Formik
               enableReinitialize={true}
               initialValues={initialStateAdd}
               validationSchema={validationSchema}
               onSubmit={(values) => {
                  handleSave(values);
               }}
            >
               {({ handleSubmit, setFieldValue, values, errors }) => (
                  <Form>
                     <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mx: 5, my: 4 }}>
                        <Typography>{tab}</Typography>
                        <Button variant="outlined" color="inherit" onClick={gotoBack}>
                           Back
                        </Button>
                     </Stack>
                     <Divider />
                     <TabPanel value="Basic information">
                        <MartInfo locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartInfo>
                     </TabPanel>
                     <TabPanel value="App setting">
                        <MartAppSetting locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartAppSetting>
                     </TabPanel>
                     <TabPanel value="Payment Method">
                        <MartPayment locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartPayment>
                     </TabPanel>
                     <TabPanel value="Delivery Setting">
                        <MartDelivery locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartDelivery>
                     </TabPanel>
                     <TabPanel value="Contact information">
                        <MartContact locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartContact>
                     </TabPanel>
                     <TabPanel value="Admin account information">
                        <MartAdmin locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartAdmin>
                     </TabPanel>
                     <TabPanel value="Subscription">
                        <MartSubcription locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartSubcription>
                     </TabPanel>
                     <TabPanel value="Billing info">
                        <MartBilling locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartBilling>
                     </TabPanel>
                     <TabPanel value="Optional service">
                        <MartOptional locale={locale} values={values} setFieldValue={setFieldValue} errors={errors}></MartOptional>
                     </TabPanel>
                     <Stack sx={{ mb: 5 }} direction="row" justifyContent="center" alignItems="center">
                        <Button type="submit" color="primary" variant="contained" onSubmit={() => handleSubmit()}>
                           ADD NEW
                        </Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </Card>
      </TabContext>
   );
};

export default AddMart;
