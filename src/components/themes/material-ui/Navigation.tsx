import React from 'react';

const Input: React.FC<any> = ({ id, navigationItems }) => {
  
  return (
    <ul>
      {navigationItems.map((item: any) => <li>{item.label}</li>)}
    </ul>
  );
}

export default Input;

