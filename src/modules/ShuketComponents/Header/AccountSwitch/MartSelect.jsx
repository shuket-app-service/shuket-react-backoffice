import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountSwitch, switchAccount } from "../../../store/auth/thunk";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocaleContext } from "@crema/context/AppContextProvider/LocaleContextProvider";
import { translate } from "../../../../@crema/services/localization/translate";
import { indexLocate } from "./locate";

export default function AccountSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const isChange = jwtDecode(user.token)?.is_change;
  const [accounts, setAccounts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { locale } = useLocaleContext();

  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(getListAccountSwitch());
      setAccounts(response.payload);
    }
    if (isAuthenticated) {
      fetchData();
    }
    return () => {};
  }, [isAuthenticated]);

  //reset selectBox when reset account
  useEffect(()=>{
    if(isChange != 1){
      setInputValue('')
    }
  },[isChange])

  const handleSwitchAccount = async (code, name) =>{
     setInputValue(name)
     await dispatch(switchAccount(code)).then(()=>{
        navigate('/app-management/app-builder')
     })
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      id="country-select-demo"
      sx={{ width: 300, py: 3 }}
      options={accounts && accounts}
      autoHighlight
      onChange={(e, value) => handleSwitchAccount(value.user_acc, value.user_name)}
      getOptionLabel={(option) => option.user_name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.user_name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={translate(locale, indexLocate.titleSelectBoxSwitch)}
          inputProps={{
            ...params.inputProps,
            autoComplete: "", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
