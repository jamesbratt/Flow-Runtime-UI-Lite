import React from 'react';
import { connect } from 'react-redux';

const ComponentWrapper: React.FC = ({ componentType, componentRegistry }: any) => {
  const Component = componentRegistry[componentType];
  return (
    <Component />
  );
}

const mapStateToProps = ({ componentRegistry }: any) => ({ componentRegistry });

export default connect(mapStateToProps)(ComponentWrapper);

