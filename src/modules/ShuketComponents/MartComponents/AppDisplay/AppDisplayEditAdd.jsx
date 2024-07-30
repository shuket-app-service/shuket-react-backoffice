import React from 'react'
import AppDisplayEdit from './edit';
import AppDisplayAdd from './add';
import { useLocation } from 'react-router-dom';

const AppDisplayEditAdd = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type'); 
  
    let ComponentToRender = () => <div>NOT FOUND</div>;
  
    if (type === 'edit') {
      ComponentToRender = AppDisplayEdit;
    } else if (type === 'add') {
      ComponentToRender = AppDisplayAdd;
    } 
  
    return (
      <div>
        <ComponentToRender />
      </div>
    );
}

export default AppDisplayEditAdd