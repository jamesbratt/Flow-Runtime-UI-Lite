import React from 'react';
import { connect } from 'react-redux';
import { fetchServiceData, setSelected, setContentValue } from '../actions';

class ComponentWrapper extends React.Component<any, any> {
  componentDidMount() {
    const { objectDataRequest } = this.props.pageComponentData;
    if (objectDataRequest) {
      this.props.fetchServiceData(
        '84980601-01a4-489c-bbff-870bd6a13120',
        objectDataRequest,
        this.props.id,
      );
    }
  }

  render() {
    const Component = this.props.componentRegistry[this.props.componentType];
    return (
      <Component {...this.props} />
    );
  }
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
  fetchServiceData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);

