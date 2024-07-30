import { Icon } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import React from 'react'
import { RiBillFill } from 'react-icons/ri';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoKeyOutline } from "react-icons/io5";
import { TbBrandProducthunt } from "react-icons/tb";
import { MdStorefront } from "react-icons/md";
import { TfiImage } from "react-icons/tfi";

const VerticalNavItemIcon = ({item}) => {
    return (
      <Box component="span">
        <Icon sx={{ mr: 4 }} color="action" className={clsx("nav-item-icon")}>
        {
         item.messageId == "SALES/COLLECTION" ? <MdStorefront/> 
        : item.messageId == "Setting_Site" ? <IoSettingsOutline/>
        : item.messageId == "FCM_MANAGEMENT" ? <IoKeyOutline/>
        : item.messageId == "Import_Product" ? <TbBrandProducthunt/>
        : item.messageId == "APP_VERSION" ? <MdOutlineAppSettingsAlt/>
        : item.messageId == "Delivery_Address" ? <GrLocation/>
        : item.messageId == "Banner_Muti_Mart" ? <TfiImage/>
        : item.icon}
      </Icon>
      </Box>
    );
  };
    

export default VerticalNavItemIcon