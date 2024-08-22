import React from "react";
import Type26 from "./template/Type26.jsx";
import Type22 from "./template/Type22.jsx";
import Type19 from "./template/Type19.jsx";
import Type18 from "./template/Type18.jsx";
import Type12 from "./template/Type12.jsx";
import Type8 from "./template/Type8.jsx";
import Type31 from "./template/Type31.jsx";
import Type13 from "../images/type13.jpg";
import Type15 from "../images/type15.jpg";
import Type30 from "../images/type30.png";
import Type4 from "./template/Type4.jsx";
import Type1 from "./template/Type1.jsx";
import Type38 from "./template/Type38.jsx";
import Type7 from "./template/Type7.jsx";
import Type10 from "./template/Type10.jsx";
import Type11 from "./template/Type11.jsx";
import Type17 from "./template/Type17.jsx";
import Type20 from "./template/Type20.jsx";
import Type21 from "./template/Type21.jsx";
import Type16 from "./template/Type16.jsx";
import Type40 from "../images/type40.png";

const AppDisplayEditScreen = ({ detail }) => {
   return detail?.tmpl_type === "40" ? (
      <img style={{ width: "100%" }} src={Type40} alt="" />
   ) : detail?.tmpl_type === "38" ? (
      <Type38 dataApp={detail?.data_app}></Type38>
   ) : detail?.tmpl_type === "31" ? (
      <Type31 dataApp={detail?.data_app}></Type31>
   ) : detail?.tmpl_type === "30" ? (
      <img style={{ width: "100%" }} src={Type30} alt="" />
   ) : detail?.tmpl_type === "26" ? (
      <Type26 dataApp={detail?.data_app}></Type26>
   ) : detail?.tmpl_type === "22" ? (
      <Type22 dataApp={detail?.data_app}></Type22>
   ) : detail?.tmpl_type === "21" ? (
      <Type21 dataApp={detail?.data_app}></Type21>
   ) : detail?.tmpl_type === "20" ? (
      <Type20 dataApp={detail?.data_app}></Type20>
   ) : detail?.tmpl_type === "19" ? (
      <Type19 dataApp={detail?.data_app}></Type19>
   ) : detail?.tmpl_type === "18" ? (
      <Type18 dataApp={detail?.data_app}></Type18>
   ) : detail?.tmpl_type === "17" ? (
      <Type17 dataApp={detail?.data_app}></Type17>
   ) : detail?.tmpl_type === "16" ? (
      <Type16 dataApp={detail?.data_app}></Type16>
   ) : detail?.tmpl_type === "15" ? (
      <img style={{ width: "100%" }} src={Type15} alt="" />
   ) : detail?.tmpl_type === "13" ? (
      <img style={{ width: "100%" }} src={Type13} alt="" />
   ) : detail?.tmpl_type === "12" ? (
      <Type12 dataApp={detail?.data_app}></Type12>
   ) : detail?.tmpl_type === "11" ? (
      <Type11 dataApp={detail?.data_app}></Type11>
   ) : detail?.tmpl_type === "10" ? (
      <Type10 dataApp={detail?.data_app}></Type10>
   ) : detail?.tmpl_type === "8" ? (
      <Type8 dataApp={detail?.data_app}></Type8>
   ) : detail?.tmpl_type === "7" ? (
      <Type7 dataApp={detail?.data_app}></Type7>
   ) : detail?.tmpl_type === "4" ? (
      <Type4 dataApp={detail?.data_app}></Type4>
   ) : detail?.tmpl_type === "1" ? (
      <Type1 dataApp={detail?.data_app}></Type1>
   ) : null;
};

export default AppDisplayEditScreen;
