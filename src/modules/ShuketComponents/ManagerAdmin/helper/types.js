import moment from "moment";

export const limitType = [10, 15, 20, 25, 30, 50, 100];

export const allSelect = {
  value: "",
  text: {
     kr: "---모두---",
     en: "--ALL--",
  },
};

export const userType = [
    {
      value: "phone",
      text: {
        kr: "휴대폰 번호",
        en: "Phone",
      },
    },
    {
      value: "email",
      text: {
        kr: "Email",
        en: "Email",
      },
    },
    {
        value: "name",
        text: {
          kr: "오래된순",
          en: "Name",
        },
      },
  ];
  
export const orderType = [
    {
      value: "newest",
      text: {
        kr: "새로운순",
        en: "Newest",
      },
    },
    {
      value: "oldest",
      text: {
        kr: "오래된순",
        en: "Oldest",
      },
    },
  ];
  

  export const dateType = [
    {
      date_start:  moment().format("DD/MM/YYYY"),
      date_end:  moment().format("DD/MM/YYYY"),
      value: "today",
      text: {
        kr: "Today",
        en: "Today",
      },
    },
    {
      date_start: moment().subtract(1, 'days').format("DD/MM/YYYY"),
      date_end: moment().subtract(1, 'days').format("DD/MM/YYYY"),
      value: "yesterday",
      text: {
        kr: "Yesterday",
        en: "Yesterday",
      },
    },
    {
      date_start: moment().subtract(7, 'days').format("DD/MM/YYYY"),
      date_end: moment().format("DD/MM/YYYY"),
      value: "last7days",
      text: {
        kr: "Last 7 Days",
        en: "Last 7 Days",
      },
    },
    {
      date_start: moment().subtract(30, 'days').format("DD/MM/YYYY"),
      date_end: moment().format("DD/MM/YYYY"),
      value: "last30days",
      text: {
        kr: "Last 30 Days",
        en: "Last 30 Days",
      },
    },
    {
      date_start:  moment().startOf('month').format('DD/MM/YYYY'),
      date_end: moment().endOf('month').format('DD/MM/YYYY'),
      value: "thismonth",
      text: {
        kr: "This Month",
        en: "This Month",
      },
    },
    {
      date_start: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
      date_end:  moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
      value: "lastmonth",
      text: {
        kr: "Last Month",
        en: "Last Month",
      },
    },
    {
      value: "custom",
      text: {
        kr: "Custom",
        en: "Custom",
      },
    },
  ];
  