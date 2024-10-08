import React from 'react';
import languageData from './data';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { Fonts } from '@crema/constants/AppEnums';
import {
  useLocaleActionsContext,
  useLocaleContext,
} from '@crema/context/AppContextProvider/LocaleContextProvider';
import Typography from '@mui/material/Typography';
import { alpha, Box } from '@mui/material';
import PropsTypes from 'prop-types';
import AppTooltip from '../AppTooltip';

const AppLngSwitcher = ({ iconOnly, tooltipPosition }) => {
  const { locale } = useLocaleContext();
  console.log('AppLngSwitcher-- locale:', locale)
  const { updateLocale } = useLocaleActionsContext();
  const [anchorElLng, setAnchorElLng] = React.useState(null);

  const onClickMenu = (event) => {
    setAnchorElLng(event.currentTarget);
  };
  const changeLanguage = (language) => {
    updateLocale(language);
    setAnchorElLng(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!iconOnly ? (
        <IconButton
          sx={{
            height: 40,
            fontSize: 16,
            borderRadius: 30,
            padding: '6px 12px',
            color: (theme) => theme.palette.text.secondary,
            backgroundColor: (theme) => theme.palette.background.default,
            border: 1,
            borderColor: 'transparent',
            '&:hover, &:focus': {
              color: (theme) => theme.palette.text.primary,
              backgroundColor: (theme) =>
                alpha(theme.palette.background.default, 0.9),
              borderColor: (theme) => alpha(theme.palette.text.secondary, 0.25),
            },
            '& .langText': {
              ml: 2.5,
              fontSize: 16,
              fontWeight: Fonts.REGULAR,
              display: { xs: 'none', sm: 'inline-block' },
            },
            '& svg': {
              fontSize: 20,
            },
          }}
          className='lang-switcher-btn'
          aria-label='account of current user'
          aria-controls='language-switcher'
          aria-haspopup='true'
          onClick={onClickMenu}
          color='inherit'
          size='large'
        >
          <TranslateOutlinedIcon />
          <span className='langText'>{locale.name}</span>
        </IconButton>
      ) : (
        <AppTooltip title='Language' placement={tooltipPosition}>
          <IconButton
            sx={{
              height: 40,
              width: 40,
              borderRadius: '50%',
              padding: '6px 9px',
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: (theme) => theme.palette.background.default,
              border: 1,
              borderColor: 'transparent',
              '&:hover, &:focus': {
                color: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.default, 0.9),
                borderColor: (theme) =>
                  alpha(theme.palette.text.secondary, 0.25),
              },
              '& .langText': {
                ml: 2.5,
                fontSize: 16,
                fontWeight: Fonts.REGULAR,
                display: { xs: 'none', sm: 'inline-block' },
              },
              '& svg': {
                fontSize: 20,
              },
            }}
            className='lang-switcher-btn'
            aria-label='account of current user'
            aria-controls='language-switcher'
            aria-haspopup='true'
            onClick={onClickMenu}
            color='inherit'
            size='large'
          >
            <TranslateOutlinedIcon />
          </IconButton>
        </AppTooltip>
      )}
      <Menu
        anchorEl={anchorElLng}
        id='language-switcher'
        keepMounted
        open={Boolean(anchorElLng)}
        onClose={() => setAnchorElLng(null)}
      >
        {languageData.map((language, index) => (
          <MenuItem key={index} onClick={() => changeLanguage(language)}>
            <Box
              sx={{
                width: 160,
              }}
            >
              <Typography
                sx={{
                  mb: 0,
                  fontSize: { xs: 14, sm: 16 },
                  fontWeight: Fonts.MEDIUM,
                }}
                component='h4'
                variant='h4'
              >
                {language.name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AppLngSwitcher;

AppLngSwitcher.defaultProps = {
  iconOnly: false,
};

AppLngSwitcher.propTypes = {
  iconOnly: PropsTypes.bool,
  tooltipPosition: PropsTypes.string,
};
