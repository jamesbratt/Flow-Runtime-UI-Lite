import React from 'react';
import Container from './components/Container';
import Outcome from './components/Outcome';
import pathOr from 'ramda/src/pathOr';
import { initializeFlow, moveFlow, clickOutcome } from './actions';
import { connect } from 'react-redux';

const App: React.FC = ({ pageState, initializeFlow, moveFlow, clickOutcome }: any) => {

  if (pageState.isMoving) {
    moveFlow('84980601-01a4-489c-bbff-870bd6a13120');
  }

  const init = () => {
    initializeFlow(
      '0a4605a9-7831-4fd7-b33c-0eec7aa6849e',
      null,
      '84980601-01a4-489c-bbff-870bd6a13120',
    );
  }

  const pageContainerResponses: any = pathOr(
    [],
    ['selectedMapElementInvokeResponse', 'pageResponse', 'pageContainerResponses'],
    pageState.invokeResponse
  );

  const outcomeResponses: any = pathOr(
    [],
    ['selectedMapElementInvokeResponse', 'outcomeResponses'],
    pageState.invokeResponse
  );

  return (
    <div className="App">
      {pageState.isMoving ?
        <p>Loading...</p> :
        <>
          <button onClick={init}>Initialize Flow</button>
          {pageContainerResponses.map((container: any) => {
            return <Container key={container.id} container={container} />
          })}
          {outcomeResponses.filter((outcome: any) => !outcome.pageObjectBindingId)
            .map((outcome: any) => <Outcome key={outcome.id} outcome={outcome} onClick={clickOutcome} />)}
        </>
      }
    </div>
  );
}

const mapStateToProps = ({ pageState }: any) => ({ pageState }) 

const mapDispatchToProps = {
  initializeFlow,
  moveFlow,
  clickOutcome,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
