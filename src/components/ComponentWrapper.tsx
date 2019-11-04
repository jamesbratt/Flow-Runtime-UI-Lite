import React from 'react';
import { connect } from 'react-redux';
import { setSelected, setContentValue } from '../actions';

const ComponentWrapper: React.FC = ({ componentType, componentRegistry, ...props }: any) => {
  const Component = componentRegistry[componentType];
  return (
    <Component {...props} />
  );
}

const mapStateToProps = ({ pageStructure, componentRegistry }: any, ownProps: any) => ({
  pageComponent: pageStructure.mapElementInvokeResponses.pageResponse.pageComponentResponses.find(
    ((component: any) => component.id === ownProps.id)
  ),
  pageComponentData: pageStructure.mapElementInvokeResponses.pageResponse.pageComponentDataResponses.find(
    ((component: any) => component.pageComponentId === ownProps.id)
  ),
  outcomeResponses: pageStructure.mapElementInvokeResponses.outcomeResponses,
  componentRegistry,
});

const mapDispatchToProps = {
  setSelected,
  setContentValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);

