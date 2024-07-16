import React from 'react';
import { Box, inputBaseClasses, lighten } from '@mui/material';
import PropTypes from 'prop-types';

export const AccountsWrapper = ({ iconPosition, children }) => {
  return (
    <Box
      sx={{
        borderRadius: (theme) => theme.cardRadius,
        display: 'block',
        cursor: 'pointer',
        '& .searchRoot .MuiInputBase-input': {
          paddingLeft: iconPosition === 'right' ? 5 : 'calc(1em + 28px)',
          paddingRight: iconPosition === 'right' ? 'calc(1em + 28px)' : 5,
        },
      }}
    >
      {children}
    </Box>
  );
};
AccountsWrapper.propTypes = {
  iconPosition: PropTypes.string,
  children: PropTypes.node,
};
