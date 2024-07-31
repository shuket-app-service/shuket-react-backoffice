import moment from "moment";

export const initialStateFilter = {
   app_type: "",
   keyword_type: "mart_name",
   keyword_value: "",
   limit: 10,
   order_by: "newest",
   page: 1,
   status: "",
   mart_use_sync_order: false,
   mart_with_stock: false,
};

export const initialStateAdd = {
   //basic
   name: "",
   typemart: "SG",
   martcommon: "",
   mart_business_type: "SA",
   type: "H",
   mart_display: "N",
   city: "",
   district: "",
   address: "",
   license: "",
   phone: "",
   pos_regcode: "",
   group_no: "",
   pos_company: "",
   pos_connect_logic: false,
   order_sync: "N",
   bizhour_open: moment().format("YYYY-MM-DDTHH:mm"),
   bizhour_close: moment().format("YYYY-MM-DDTHH:mm"),
   //app setting
   push_key_android: "FCM0000001",
   push_key_ios: "FCM0000001",
   //payment
   mart_pm_crc: "Y", //Online Payment
   mart_pm_xod: "Y", //COD, CCOD
   op_payment: [
      {
         payment_code: "SKP",
         payment_lang_ko: "간편결제 (슈켓 PAY)",
         payment_lang_en: "Shuket-pay",
         checked: true,
      },
      {
         payment_code: "BANK",
         payment_lang_ko: "계좌 이체",
         payment_lang_en: "BANK",
         checked: true,
      },
      {
         payment_code: "CARD",
         payment_lang_ko: "카드결제",
         payment_lang_en: "Card Payment",
         checked: true,
      },
      {
         payment_code: "KKP",
         payment_lang_ko: "카카오페이",
         payment_lang_en: "Kakao-pay",
         checked: true,
      },
      {
         payment_code: "NP",
         payment_lang_ko: "네이버페이",
         payment_lang_en: "Naver-pay",
         checked: true,
      },
      {
         payment_code: "CCOD",
         payment_lang_ko: "현장카드결제",
         payment_lang_en: "On-site credit card payment",
         checked: true,
      },
      {
         payment_code: "COD",
         payment_lang_ko: "현장현금결제",
         payment_lang_en: "On-site cash payment",
         checked: true,
      },
      {
         payment_code: "VBANK",
         payment_lang_ko: "가상계좌(무통장입금)",
         payment_lang_en: "Virtual account",
         checked: true,
      },
   ],
   //delivery
   set_delivery: "Y",
   store_set_hour: "N",
   store_pick_time_interval: "30",
   store_set_hour_start: moment().format("YYYY-MM-DDTHH:mm"),
   store_set_hour_end: moment().format("YYYY-MM-DDTHH:mm"),
   store_pk_cod: "N",
   //contact
   contact_name: "",
   contact_email: "",
   contact_phone: "",
   //admin account
   u_id: "",
   u_pwd: "",
   u_pwd_conf: "",
   add_group: "",
   add_level: "",
   //subscription
   s_type:"basic",
   //billing 
   s_payment:"CMS",
   s_discount:0,
   s_discount_period:"",
   s_date_service:moment().format("YYYY-MM-DDTHH:mm"),
   s_date_billing:moment().format("YYYY-MM-DDTHH:mm"),
   partner_company:"",
   spt_code:"",
   //optional service
   receipt_logic: false,
   local_partner_logic: false,
   pop_logic: false
};

export const stateIDValid = {
   value: true,
   text: {
      kr: "ID not exists, available to use",
      en: "ID not exists, available to use",
   },
};

export const stateIDInvalid = {
   value: false,
   text: {
      kr: "ID already exists,not available to use",
      en: "ID already exists,not available to use",
   },
};
