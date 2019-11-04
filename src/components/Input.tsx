import React from 'react';

const INPUT_TYPE: any = {
  ContentString: 'text',
  ContentNumber: 'number',
}

const Input: React.FC = ({ pageComponent, pageComponentData, setContentValue }: any) => {
  
  const { contentValue } = pageComponentData;
  const { id, label, contentType } = pageComponent;
  
  return (
    <>
      <label>{label}</label>
      <input
        type={INPUT_TYPE[contentType]}
        onChange={(e) => setContentValue(id, e.target.value)} defaultValue={contentValue}
      />
    </>
  );
}

export default Input;

