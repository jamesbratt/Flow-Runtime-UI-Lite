import React from 'react';
import Container from './components/Container';
import Outcome from './components/Outcome';
import { pathOr } from 'ramda';
import { initializeFlow, moveFlow } from './actions';
import { connect } from 'react-redux';

const App: React.FC = ({ pageStructure, pageState, initializeFlow, moveFlow }: any) => {

  if (pageState.pageIsMoving) {
    moveFlow('84980601-01a4-489c-bbff-870bd6a13120');
  } 

  const init = () => {
    initializeFlow(
      '0a4605a9-7831-4fd7-b33c-0eec7aa6849e',
      null,
      '84980601-01a4-489c-bbff-870bd6a13120',
    );
  }

  const pageContainerResponses = pathOr([], ['mapElementInvokeResponses', 'pageResponse', 'pageContainerResponses'], pageStructure);
  const pageContainerDataResponses = pathOr([], ['mapElementInvokeResponses','pageResponse', 'pageContainerDataResponses'], pageStructure);
  const pageComponentResponses = pathOr([], ['mapElementInvokeResponses','pageResponse', 'pageComponentResponses'], pageStructure);
  const pageComponentDataResponses = pathOr([], ['mapElementInvokeResponses','pageResponse', 'pageComponentDataResponses'], pageStructure);
  const outcomeResponses = pathOr([], ['outcomeResponses'], pageStructure);

  return (
    <div className="App">
      {pageState.pageIsMoving ?
        <p>Loading...</p> :
        <>
          <button onClick={init}>Initialize Flow</button>
          {pageContainerResponses.map((container: any) => {
            return <Container
              key={container.id}
              container={container}
              pageContainerDataResponses={pageContainerDataResponses}
              pageComponentResponses={pageComponentResponses}
              pageComponentDataResponses={pageComponentDataResponses}
            />
          })}
          {outcomeResponses.filter((outcome: any) => outcome.pageObjectBindingId)
            .map((outcome: any) => {
            <Outcome key={outcome.id} outcome={outcome} />
          })}
        </>
      }

    </div>
  );
}

const mapStateToProps = ({ pageStructure, pageState }: any) => ({ pageStructure, pageState }) 

const mapDispatchToProps = {
  initializeFlow,
  moveFlow
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
