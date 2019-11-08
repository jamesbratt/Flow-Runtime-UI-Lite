import React from 'react';

const INPUT_TYPE: any = {
  ContentString: 'text',
  ContentNumber: 'number',
}

const Input: React.FC = ({ pageComponent, pageComponentData, setContentValue, syncFlow }: any) => {
  
  const { contentValue, isVisible } = pageComponentData;
  const { id, label, contentType, hasEvents } = pageComponent;

  const onChange = () => {
    syncFlow('84980601-01a4-489c-bbff-870bd6a13120');
  }
  
  return (
    <div style={isVisible ? {display: 'block'} : {display: 'none'}}>
      <label>{label}</label>
      <input
        type={INPUT_TYPE[contentType]}
        onChange={(e) => setContentValue(id, e.target.value)} defaultValue={contentValue}
        onBlur={hasEvents ? onChange : () => {}}
      />
    </div>
  );
}

export default Input;

