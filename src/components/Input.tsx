import React from 'react';

const Input: React.FC = ({ pageComponent, pageComponentData }: any) => {
  
  const { contentValue } = pageComponentData;
  const { label } = pageComponent;
  
  return (
    <>
      <label>{label}</label>
      <input type="text" defaultValue={contentValue} />
    </>
  );
}

export default Input;

