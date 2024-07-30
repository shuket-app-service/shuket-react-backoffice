import React from "react";
import Type26 from "./template/Type26.jsx";
import Type22 from "./template/Type22.jsx";
import Type19 from "./template/Type19.jsx";
import Type18 from "./template/Type18.jsx";
import Type12 from "./template/Type12.jsx";
import Type8 from "./template/Type8.jsx";
import Type31 from "./template/Type31.jsx";
import Type13 from "../images/AP00000013.jpg";
import Type15 from "../images/AP00000015.jpg";
import Type4 from "./template/Type4.jsx";
import Type1 from "./template/Type1.jsx";

const AppDisplayEditScreen = ({ detail }) => {
   return detail?.tmpl_type === "31" ? (
      <Type31 dataApp={detail?.data_app}></Type31>
   ) : detail?.tmpl_type === "26" ? (
      <Type26 dataApp={detail?.data_app}></Type26>
   ) : detail?.tmpl_type === "22" ? (
      <Type22 dataApp={detail?.data_app}></Type22>
   ) : detail?.tmpl_type === "19" ? (
      <Type19 dataApp={detail?.data_app}></Type19>
   ) : detail?.tmpl_type === "18" ? (
      <Type18 dataApp={detail?.data_app}></Type18>
   ) : detail?.tmpl_type === "12" ? (
      <Type12 dataApp={detail?.data_app}></Type12>
   ) : detail?.tmpl_type === "8" ? (
      <Type8 dataApp={detail?.data_app}></Type8>
   ) : detail?.tmpl_type === "4" ? (
      <Type4 dataApp={detail?.data_app}></Type4>
   ) : detail?.tmpl_type === "1" ? (
      <Type1 dataApp={detail?.data_app}></Type1>
   ) : detail?.tmpl_type === "13" ? (
      <img style={{ width: "100%" }} src={Type13} alt="" />
   ) : detail?.tmpl_type === "15" ? (
      <img style={{ width: "100%" }} src={Type15} alt="" />
   ) : null;
};

export default AppDisplayEditScreen;
