import React from "react";
import PropTypes from "prop-types";
import { AccountsWrapper } from "./index.style";
import AccountComponentCard from "./AccountComponentCard";
import MartSelect from "./MartSelect";
import { GrPowerReset } from "react-icons/gr";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { resetAccount } from "../../../store/auth/thunk.js"
const AccountSwitchHeader = ({ placeholder, iconPosition, align, overlap, onlyIcon, disableFocus, iconStyle, ...rest }) => {
   const user = useSelector((state) => state.auth.user);
   const isChange = jwtDecode(user.token)?.is_change;
   console.log("AppHeader--", "user:", user, "isChange:", isChange);
   const dispatch = useDispatch();
   const navigate = useNavigate()

   const handleResetAccount = () => {
      dispatch(resetAccount()).then(()=>{
        navigate('/service/sales-collection')
     })
   };

   return (
      <AccountsWrapper sx={rest.sx} iconPosition={iconPosition}>
         <Stack direction="row" alignItems="center" gap={2}>
            <AccountComponentCard title={""} maxHeight={500} description={""} component={MartSelect} />
            {user && isChange == 1 && (
               <IconButton sx={{ m: 2 }} onClick={handleResetAccount}>
                  <GrPowerReset />
               </IconButton>
            )}
         </Stack>
      </AccountsWrapper>
   );
};

export default AccountSwitchHeader;

AccountSwitchHeader.propTypes = {
   iconPosition: PropTypes.string,
   align: PropTypes.string,
   placeholder: PropTypes.string,
   overlap: PropTypes.bool,
   borderLight: PropTypes.bool,
   className: PropTypes.string,
   onlyIcon: PropTypes.bool,
   disableFocus: PropTypes.bool,
   iconStyle: PropTypes.object,
};

AccountSwitchHeader.defaultProps = {
   onlyIcon: false,
   overlap: true,
   iconPosition: "left",
   align: "left",
   iconStyle: {
      color: "grey",
   },
};
