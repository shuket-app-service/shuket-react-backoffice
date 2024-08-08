import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as prettier from "prettier/standalone";
import * as htmlParser from "prettier/parser-html";
const RawHtml = ({ dataDefault }) => {
   const [dataCoder, setDataCoder] = useState(null);

   const fetchData = async (data) => {
      const formattedHtml = await prettier.format(`${dataDefault}`, {
         parser: "html",
         plugins: [htmlParser],
      });
      setDataCoder(formattedHtml);
   };
   useEffect(() => {
      if (dataDefault) {
         fetchData(dataDefault);
      }else{
        setDataCoder(null)
      }
   }, [dataDefault]);
   return (
      dataCoder && (
         <Paper sx={{ mt: 5, p: 1 }} elevation={4}>
            <SyntaxHighlighter language="html" style={dracula} wrapLines={true} lineProps={{ style: { whiteSpace: "pre-wrap" } }}>
               {dataCoder}
            </SyntaxHighlighter>
         </Paper>
      )
   );
};

export default RawHtml;
