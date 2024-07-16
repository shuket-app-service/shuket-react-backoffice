import { Box, Icon } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { IoCashOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { FaImages } from "react-icons/fa";
import { PiImageSquareBold } from "react-icons/pi";
import { RiBillLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";

const VerticalCollapseIcon = ({item}) => {
  return (
    <Box component="span">
      <Icon sx={{ mr: 4 }} color="action" className={clsx("nav-item-icon")}>
        {item.messageId == "CASH_MANAGEMENT" ? <IoCashOutline />  
        : item.messageId == "MANAGE_ADMIN" ? <GrUserAdmin/> 
        : item.messageId == "MANAGE_IMAGES" ? <FaImages/> 
        : item.messageId == "Notice" ? <FaRegBell/> 
        : item.messageId == "Catalogs" ? <PiImageSquareBold/>
        : item.messageId == "Manage_Order" ? <RiBillLine/>
         :<RiDashboardLine />}
      </Icon>
    </Box>
  );
};

export default VerticalCollapseIcon;
