import React from 'react';
import { connect } from 'react-redux';
import { fetchServiceData, moveWithSelection, setContentValue, syncFlow } from '../actions/pageStateActions';

import {
  outcomeResponses,
  pageComponentDataResponses,
  pageComponentResponses,
} from '../interfaces/invokeResponse';

interface componentWrapperProps {
  id: string,
  pageComponent: pageComponentResponses,
  pageComponentData: pageComponentDataResponses,
  outcomeResponses: [outcomeResponses],
  componentRegistry: any,
  fetchServiceData: Function,
  componentType: string,
  isFetchingServiceData: boolean,
}

class ComponentWrapper extends React.Component<componentWrapperProps, {}> {

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
    const { objectDataRequest } = this.props.pageComponentData;
    return (
      <>
        {this.props.isFetchingServiceData && objectDataRequest ?
          <p>Fetching data from a service...</p> :
          <Component {...this.props} />
        }
      </>
    );
  }
}

const mapStateToProps = ({ pageState, componentRegistry }: any, ownProps: componentWrapperProps) => ({

  pageComponent: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentResponses.find(
    ((component: pageComponentResponses) => component.id === ownProps.id)
  ),

  pageComponentData: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentDataResponses.find(
    ((component: pageComponentDataResponses) => component.pageComponentId === ownProps.id)
  ),

  outcomeResponses: pageState.invokeResponse.selectedMapElementInvokeResponse.outcomeResponses,

  isFetchingServiceData: pageState.isFetchingServiceData.find(
    (sd : any) => sd.pageComponentId === ownProps.id
  ) ? true : false,
  componentRegistry,
});

const mapDispatchToProps = {
  moveWithSelection,
  syncFlow,
  setContentValue,
  fetchServiceData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);

