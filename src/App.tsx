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

const App: React.FC<IApp> = ({ pageState, initializeFlow, clickOutcome }) => {

  const init = () => {
    initializeFlow(
      '5d205980-c4c4-46dd-ae12-e9e6531c71f5',
      null,
      '84980601-01a4-489c-bbff-870bd6a13120',
    );
  }

  const onOutcomeClick = (outComeId: string) => {
    clickOutcome('84980601-01a4-489c-bbff-870bd6a13120', outComeId)
  }

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
          <button onClick={init}>Initialize Flow</button>
          {containers.map((container: any) => {
            return <Container key={container.id} container={container} />
          })}
          {outcomes.filter((outcome: any) => !outcome.pageObjectBindingId)
            .map((outcome: outcomeResponses) => <Outcome key={outcome.id} outcome={outcome} onClick={onOutcomeClick} />)}
        </>
      }
    </div>
  );
}

const mapStateToProps = ({ pageState }: any) => ({ pageState }) 

const mapDispatchToProps = {
  initializeFlow,
  clickOutcome,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
