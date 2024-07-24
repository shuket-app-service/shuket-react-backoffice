import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import AppScrollbar from "../../../../@crema/components/AppScrollbar";
import AppAnimate from "../../../../@crema/components/AppAnimate";

const AccountComponentCard = ({
  title,
  maxHeight,
  description,
  component: Component,
}) => {
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box sx={{ width: 300, }}>
          <Component />
      </Box>
    </AppAnimate>
  );
};

export default AccountComponentCard;

AccountComponentCard.defaultProps = {
  description: "",
  maxHeight: 500,
};

AccountComponentCard.propTypes = {
  title: PropTypes.node.isRequired,
  maxHeight: PropTypes.number,
  description: PropTypes.node,
  component: PropTypes.any.isRequired,
};
