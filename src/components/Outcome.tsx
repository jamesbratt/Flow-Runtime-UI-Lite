import React from 'react';
import { connect } from 'react-redux';
import { moveFlow } from '../actions';

const Outcome: React.FC = ({ outcome, pageStructure, moveFlow }: any) => {
  return (
    <button onClick={() => moveFlow(outcome.id, '84980601-01a4-489c-bbff-870bd6a13120')}>
      {outcome.label}
    </button>
  );
}

const mapStateToProps = ({ pageStructure }: any) => ({ pageStructure }) 
const mapDispatchToProps = {
  moveFlow,
}

export default connect(mapStateToProps, mapDispatchToProps)(Outcome);
