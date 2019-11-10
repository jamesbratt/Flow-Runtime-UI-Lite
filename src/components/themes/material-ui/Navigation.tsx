import React from 'react';

const Input: React.FC<any> = ({ id, items, title }) => {
  
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {items.map((item: any) => <li key={item.id}><button>{item.label}</button></li>)}
      </ul>
    </div>
  );
}

export default Input;

