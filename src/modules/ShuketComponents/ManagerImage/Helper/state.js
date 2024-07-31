import moment from "moment";

export const initialStateFilter = {
   key_type: "br_name",
   keyword_value: "",
   per_page: 20,
   page: 1,
   ln: "en",
   filter_status: "A",
   filter_order: "RD",
   image_cate: "",
   image_type: "",
};
export const initialStateFilterWithBarcode = {
   date_end: "",
   date_start: "",
   keyword_type: "img_tags",
   keyword_value: "",
   per_page: 20,
   limit_page: 20,
   order_by:"newest",
   page: 1,
   status: "all",
};
