import React from 'react';
import ComponentWrapper from './ComponentWrapper';
import concat from 'ramda/src/concat';
import pathOr from 'ramda/src/pathOr';
import sort from 'ramda/src/sort';
import { connect } from 'react-redux';

const Container: React.FC = ({ container, pageComponents }: any) => {

  const childContainers = pathOr([], ['pageContainerResponses'], container);
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

const mapStateToProps = ({ pageStructure }: any, ownProps: any) => ({
  pageComponents: pageStructure.mapElementInvokeResponses.pageResponse.pageComponentResponses.filter(
    ((component: any) => component.pageContainerId === ownProps.container.id)
  )
})

const ConnectedContainer = connect(mapStateToProps)(Container);

export default ConnectedContainer;
