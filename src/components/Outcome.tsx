import React from 'react';
import { objectData } from '../interfaces/common';
import { outcomeResponses } from '../interfaces/invokeResponse';

interface IOutcome {
  outcome: outcomeResponses,
  onClick: Function,
  data?: objectData,
}

const Outcome: React.FC<IOutcome> = ({ outcome, onClick, data }) => {
  return (
    <button onClick={() => onClick(outcome.id, data)}>
      {outcome.label}
    </button>
  );
}

export default Outcome;
