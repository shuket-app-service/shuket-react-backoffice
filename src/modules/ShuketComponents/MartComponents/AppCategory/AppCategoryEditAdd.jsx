import React from 'react'
import { useLocation } from 'react-router-dom';
import AppCategoryAdd from './add';

const AppCategoryEditAdd = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type'); 
  
    let ComponentToRender = () => <div>NOT FOUND</div>;
  
   if (type === 'add') {
      ComponentToRender = AppCategoryAdd;
    } 
  
    return (
      <div>
        <ComponentToRender />
      </div>
    );
}

export default AppCategoryEditAdd