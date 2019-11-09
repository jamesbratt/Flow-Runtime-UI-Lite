import React from 'react';
import ComponentWrapper from './ComponentWrapper';
import concat from 'ramda/src/concat';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import { connect } from 'react-redux';

import {
  pageContainerResponses,
  pageComponentResponses,
} from '../interfaces/invokeResponse';

interface IContainer {
  container: pageContainerResponses,
  pageComponents: [pageComponentResponses],
}

const Container: React.FC<IContainer> = ({ container, pageComponents }) => {

  const childContainers: any = pathOr([], ['pageContainerResponses'], container);
  const children = sort((a: any, b: any) =>  {
      return a.order - b.order;
  }, concat(pageComponents, childContainers));

  return (
    <div className="container">
      {children.map((child: any) => {
        return child.containerType ? 
          <ConnectedContainer
            key={child.id}
            container={child}
          /> : 
          <ComponentWrapper
            key={child.id}
            id={child.id}
            componentType={child.componentType}
          />
      })}
    </div>
  );
}

const mapStateToProps = ({ pageState }: any, ownProps: any) => ({
  pageComponents: pageState.invokeResponse.selectedMapElementInvokeResponse.pageResponse.pageComponentResponses.filter(
    ((component: pageComponentResponses) => component.pageContainerId === ownProps.container.id)
  )
})

const ConnectedContainer = connect(mapStateToProps)(Container);

export default ConnectedContainer;
