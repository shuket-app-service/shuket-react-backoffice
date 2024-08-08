import React from 'react'
import { useLocation } from 'react-router-dom';
import PushManagerAdd from './add';

const PushManagerEditAdd = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type'); 
  
    let ComponentToRender = () => <div>NOT FOUND</div>;
  
   if (type === 'add') {
      ComponentToRender = PushManagerAdd;
    } 
  
    return (
      <div>
        <ComponentToRender />
      </div>
    );
}

export default PushManagerEditAdd