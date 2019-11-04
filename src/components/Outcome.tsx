import React from 'react';

const Outcome: React.FC = ({ outcome, onClick, data }: any) => {
  return (
    <button onClick={() => onClick(outcome.id, data)}>
      {outcome.label}
    </button>
  );
}

export default Outcome;
