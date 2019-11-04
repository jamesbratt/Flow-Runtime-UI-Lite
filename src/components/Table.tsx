import React from 'react';
import Outcome from './Outcome';
import { setSelected } from '../actions';
import { connect } from 'react-redux';

const Table: React.FC = ({ pageComponent, pageComponentDataResponses, pageStructure, setSelected }: any) => {

  const selectRow = (objectData: any, outcomeId: any) => {
    setSelected(
      pageComponent.id,
      objectData.externalId,
      !objectData.isSelected,
      outcomeId,
    )
  }

  const outcomes = pageStructure.mapElementInvokeResponses.outcomeResponses.filter((outcome: any) =>
    outcome.pageObjectBindingId === pageComponent.id
  );

  const tableData = pageComponentDataResponses.find((pcdr: any) => 
    pcdr.pageComponentId === pageComponent.id
  );

  const columns = pageComponent.columns.map((column: any) => 
    <th key={column.label}>{column.label}</th>
  );

  const rows = tableData.objectData.map((row: any) => (
    <tr key={row.externalId}>
      {outcomes ? outcomes.map((outcome: any) => 
        <td key={outcome.id}><Outcome key={outcome.id} data={row} outcome={outcome} onClick={selectRow} /></td>)
      : null}
      {row.properties.map((cell: any) => 
        <td key={cell.typeElementPropertyId}>{cell.contentValue}</td>
      )}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          {columns}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

const mapStateToProps = ({ pageStructure }: any) => ({ pageStructure });

const mapDispatchToProps = {
  setSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
