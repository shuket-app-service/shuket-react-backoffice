import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { exportExcelSalesCollection } from "../../store/salesCollection/thunk";
import { translate } from "../../../@crema/services/localization/translate";
import { filterLocate } from "./Helper/locate";

const SalesCollectionReportExcel = ({ dataFilter, locale }) => {
   const Heading = [["ID", "앱 유형", "마트", "D2코드/포스코드", "재고연동", "주문연동", "도시", "구역", "날짜 등록", "상태"]];
   const dispatch = useDispatch();
   const fileName = "sales_collection_" + moment().format("DD-MM-YYYY");
   const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
   const fileExtension = ".xlsx";

   const exportToCSV = (dataExport) => {
      const ws = XLSX.utils.json_to_sheet([]);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      XLSX.utils.sheet_add_aoa(ws, Heading);
      XLSX.utils.sheet_add_json(ws, dataExport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
   };

   const handleGetDataExport = async () => {
      const dataExport = await dispatch(exportExcelSalesCollection(dataFilter));
      exportToCSV(dataExport.payload);
   };

   return (
      <Button type="button" color="success" variant="outlined" onClick={(e) => handleGetDataExport()}>
         {translate(locale, filterLocate.btnDownloadExcel)}
      </Button>
   );
};
export default SalesCollectionReportExcel;
