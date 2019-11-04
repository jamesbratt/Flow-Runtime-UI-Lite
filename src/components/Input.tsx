import React from 'react';
import { setSelected } from '../actions';
import { connect } from 'react-redux';

const Input: React.FC = ({ pageStructure }: any) => {
  return (
    <input type="text" value="" />
  );
}

const mapStateToProps = ({ pageStructure }: any) => ({ pageStructure });

const mapDispatchToProps = {
  setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);

