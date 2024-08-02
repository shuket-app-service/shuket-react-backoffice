import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import moment from "moment";

export default function DateRangePickerValue({dateCustom, changeDateCustom}) {

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
            <DemoItem label="Date" component="DateRangePicker">
               <DateRangePicker value={dateCustom} onChange={(newValue) => changeDateCustom(newValue)} />
            </DemoItem>
         </DemoContainer>
      </LocalizationProvider>
   );
}
