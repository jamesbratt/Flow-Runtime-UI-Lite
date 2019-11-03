import React from 'react';
import Container from './components/Container';
import Outcome from './components/Outcome';
import { pathOr } from 'ramda';
import { initializeFlow, moveFlow } from './actions';
import { connect } from 'react-redux';
import './App.css';

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

  const mapElementInvokeResponses = pathOr([], ['mapElementInvokeResponses'], pageStructure);

  return (
    <div className="App">
      <button onClick={init}>Initialize Flow</button>
      {mapElementInvokeResponses.map((response: any) => {
        const pageContainerResponses = pathOr([], ['pageResponse', 'pageContainerResponses'], response);
        const pageContainerDataResponses = pathOr([], ['pageResponse', 'pageContainerDataResponses'], response);
        const pageComponentResponses = pathOr([], ['pageResponse', 'pageComponentResponses'], response);
        const pageComponentDataResponses = pathOr([], ['pageResponse', 'pageComponentDataResponses'], response);
        const outcomeResponses = pathOr([], ['outcomeResponses'], response);
        return (
          <React.Fragment key={response.mapElementId}>
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
          </React.Fragment>
        )
      })}
    </div>
  );
}

const mapStateToProps = ({ pageStructure, pageState }: any) => ({ pageStructure, pageState }) 

const mapDispatchToProps = {
  initializeFlow,
  moveFlow
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
