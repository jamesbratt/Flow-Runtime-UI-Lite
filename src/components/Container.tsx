import React from 'react';
import Table from './Table';
import { concat, pathOr, sort } from 'ramda';
import { connect } from 'react-redux';

const Container: React.FC = ({
  container,
  pageContainerDataResponses,
  pageComponentResponses,
  pageComponentDataResponses,
  pageStructure
}: any) => {

  const pageComponents = pageComponentResponses.filter((pcr: any) => pcr.pageContainerId === container.id) || [];
  const childContainers = pathOr([], ['pageContainerResponses'], container);
  const children = sort((a: any, b: any) =>  {
      return a.sortOrder - b.sortOrder;
  }, concat(pageComponents, childContainers));

  return (
    <div className="container">
      {container.developerName}
      {children.map((child: any) => {
        return child.containerType ? 
          <Container
            key={child.id}
            container={child}
            pageContainerDataResponses={pageContainerDataResponses}
            pageComponentResponses={pageComponentResponses}
            pageComponentDataResponses={pageComponentDataResponses}
          /> : 
          <Table
            key={child.id}
            pageComponent={child}
            pageComponentDataResponses={pageComponentDataResponses}
          />
      })}
    </div>
  );
}

const mapStateToProps = ({ pageStructure }: any) => ({ pageStructure }) 

export default connect(mapStateToProps)(Container);
