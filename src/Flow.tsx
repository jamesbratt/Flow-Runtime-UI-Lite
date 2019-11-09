import React from 'react';
import Container from './components/Container';
import Outcome from './components/Outcome';
import pathOr from 'ramda/src/pathOr';

import { initializeFlow, clickOutcome } from './actions';
import { connect } from 'react-redux';

import {
  outcomeResponses,
} from './interfaces/invokeResponse';

interface IApp {
  pageState: any,
  initializeFlow: Function,
  clickOutcome: Function,
}

class Flow extends React.Component<IApp, {}> {

  componentDidMount() {
    this.props.initializeFlow();
  }

  onOutcomeClick = (outComeId: string) => {
    this.props.clickOutcome('84980601-01a4-489c-bbff-870bd6a13120', outComeId)
  }

  render() {
    const { pageState } = this.props;
    const containers: any = pathOr(
      [],
      ['selectedMapElementInvokeResponse', 'pageResponse', 'pageContainerResponses'],
      pageState.invokeResponse
    );
  
    const outcomes: any = pathOr(
      [],
      ['selectedMapElementInvokeResponse', 'outcomeResponses'],
      pageState.invokeResponse
    );

    return (
      <div className="App">
        {pageState.isLoading ?
          <p>Loading...</p> :
          <>
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

const mapStateToProps = ({ pageState }: any) => ({ pageState }) 

const mapDispatchToProps = {
  initializeFlow,
  clickOutcome,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flow);
