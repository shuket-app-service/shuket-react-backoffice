import React from 'react';
import PropTypes from 'prop-types';
import { AccountsWrapper} from './index.style';
import AccountComponentCard from "./AccountComponentCard";
import MartSelect from './MartSelect';

const AccountSwitch = ({
  placeholder,
  iconPosition,
  align,
  overlap,
  onlyIcon,
  disableFocus,
  iconStyle,
  ...rest
}) => {
  return (
    <AccountsWrapper sx={rest.sx} iconPosition={iconPosition}>
         <AccountComponentCard
            title={""}
            maxHeight ={500}
            description={""}
            component={MartSelect}
          />
    </AccountsWrapper>
  );
};

export default AccountSwitch;

AccountSwitch.propTypes = {
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

AccountSwitch.defaultProps = {
  onlyIcon: false,
  overlap: true,
  iconPosition: 'left',
  align: 'left',
  iconStyle: {
    color: 'grey',
  },
};
