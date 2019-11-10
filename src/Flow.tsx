import React from 'react';
import Container from './components/Container';
import Outcome from './components/themes/material-ui/Outcome';
import NavigationWrapper from './components/NavigationWrapper';
import pathOr from 'ramda/src/pathOr';

import { initializeFlow, moveFlow } from './actions/pageStateActions';
import { connect } from 'react-redux';

import {
  outcomeResponses,
} from './interfaces/invokeResponse';

interface IApp {
  pageState: any,
  notifications: any,
  initializeFlow: Function,
  moveFlow: Function,
}

/**
 * @description The root component for the Flow runtime web app.
 * 
 * This is where it all starts.
 * 
 * It is responsible for rendering the root level container which
 * holds all other UI elements, renders all root level outcomes
 * and triggers the initialization of the flow.
 */
class Flow extends React.Component<IApp, {}> {

  componentDidMount() {

    // Here we go...
    this.props.initializeFlow();
  }

  onOutcomeClick = (outComeId: string) => {
    this.props.moveFlow(outComeId)
  }

  render() {
    const { pageState, notifications } = this.props;

    // Root level page containers
    const containers: any = pathOr(
      [],
      ['selectedMapElementInvokeResponse', 'pageResponse', 'pageContainerResponses'],
      pageState.invokeResponse
    );
  
    // Root level outcomes
    const outcomes: any = pathOr(
      [],
      ['selectedMapElementInvokeResponse', 'outcomeResponses'],
      pageState.invokeResponse
    );

    // Navigation elements
    const navigations: any = pathOr(
      [],
      ['navigationElementReferences'],
      pageState.invokeResponse
    );

    return (
      <div className="App">
        {pageState.isLoading ?
          <p>Loading...</p> :
          <>
            {notifications.map((notification: any) => {
              return <p>{notification}</p>
            })}
            {navigations.map((navigation: any) => {
              return <NavigationWrapper key={navigation.id} id={navigation.id} />
            })}
            {containers.map((container: any) => {
              return <Container key={container.id} container={container} />
            })}
            {outcomes.filter((outcome: any) => !outcome.pageObjectBindingId)
              .map((outcome: outcomeResponses) => <Outcome key={outcome.id} outcome={outcome} onClick={this.onOutcomeClick} />)}
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ pageState, notifications }: any) => ({ pageState, notifications }) 

const mapDispatchToProps = {
  initializeFlow,
  moveFlow,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flow);
