export const initialStateFilter = {
   per_page: 10,
   page: 1,
   keyword_type: "zone",
   keyword_value: "",
};

export const initialStateSearch = {
   address_name: "",
   limit: 10,
   page: 1,
};


export const initialStateFee = 
   [
      { code: "SD", value_fee: 0, value_time: 0, name: "일반", class: "row2", option_use: 1 },
      { code: "QD", value_fee: 0, value_time: 0, name: "빠른", class: "row1", option_use: 1 },
   ]
