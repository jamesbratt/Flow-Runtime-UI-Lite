import React from 'react';
import { connect } from 'react-redux';
import { setSelected, setContentValue } from '../actions';

const ComponentWrapper: React.FC = ({ componentType, componentRegistry, ...props }: any) => {
  const Component = componentRegistry[componentType];
  return (
    <Component {...props} />
  );
}

const mapStateToProps = ({ pageState, componentRegistry }: any, ownProps: any) => ({
  pageComponent: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentResponses.find(
    ((component: any) => component.id === ownProps.id)
  ),
  pageComponentData: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentDataResponses.find(
    ((component: any) => component.pageComponentId === ownProps.id)
  ),
  outcomeResponses: pageState.invokeResponse.selectedMapElementInvokeResponse.outcomeResponses,
  componentRegistry,
});

const mapDispatchToProps = {
  setSelected,
  setContentValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);

