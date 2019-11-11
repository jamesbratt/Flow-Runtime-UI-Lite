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
  theme: string,
}

/**
 * @description A higher order component that takes care of all the heavy
 * lifting so that page components can be functional and remain as "dumb" as possible.
 * By subscribing to the redux store the wrapper can determine what data from
 * the store the dumb component needs during mapping redux state to its props.
 * These additional props can then be inherited by the dumb component being
 * wrapped.
 */
class ComponentWrapper extends React.Component<componentWrapperProps, {}> {

  componentDidMount() {
    const { objectDataRequest } = this.props.pageComponentData;

    // If the component needs to make an objectdata request
    // then lets go ahead.
    if (objectDataRequest) {
      this.props.fetchServiceData(
        objectDataRequest,
        this.props.id,
      );
    }
  }

  render() {
    const { theme, componentType, componentRegistry, pageComponentData } = this.props;
    const Component = componentRegistry[theme][componentType];

    if (!Component) {
      return <p>{`The component of type "${componentType}" is not currently supported`}</p>
    }

    const { objectDataRequest, isFetchingObjectData } = pageComponentData;
    return (
      <>
        {isFetchingObjectData && objectDataRequest ?
          <p>Fetching data from a service...</p> :
          <Component {...this.props} />
        }
      </>
    );
  }
}

const mapStateToProps = ({ pageState, componentRegistry, settings }: any, ownProps: componentWrapperProps) => ({

  pageComponent: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentResponses.find(
    ((component: pageComponentResponses) => component.id === ownProps.id)
  ),

  pageComponentData: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentDataResponses.find(
    ((component: pageComponentDataResponses) => component.pageComponentId === ownProps.id)
  ),

  outcomeResponses: pageState.invokeResponse.selectedMapElementInvokeResponse.outcomeResponses,

  componentRegistry,
  theme: settings.theme,
});

const mapDispatchToProps = {
  moveWithSelection,
  syncFlow,
  setContentValue,
  fetchServiceData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWrapper);

