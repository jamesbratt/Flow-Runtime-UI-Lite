import React from 'react';

const Outcome: React.FC = ({ outcome, onClick, data }: any) => {
  return (
    <button onClick={() => onClick(data, outcome.id)}>
      {outcome.label}
    </button>
  );
}

export default Outcome;
