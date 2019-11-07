import React from 'react';
import Outcome from './Outcome';

const Table: React.FC = ({ id, pageComponent, pageComponentData, outcomeResponses, setSelected }: any) => {

  const selectRow = (outcomeId: any, objectData: any) => {
    setSelected(
      id,
      objectData.externalId,
      true,
      outcomeId,
    )
  }

  const hasColumn = (typeElementPropertyId: any) => {
    const match = pageComponent.columns.find((column: any) => column.typeElementPropertyId === typeElementPropertyId)
    return match ? true : false;
  }

  const outcomes = outcomeResponses.filter((outcome: any) =>
    outcome.pageObjectBindingId === id
  );

  const columns = pageComponent.columns.map((column: any) => 
    <th key={column.label}>{column.label}</th>
  );

  const rows = pageComponentData.objectData.map((row: any) => (
    <tr key={row.externalId}>
      {outcomes ? outcomes.map((outcome: any) => 
        <td key={outcome.id}><Outcome key={outcome.id} data={row} outcome={outcome} onClick={selectRow} /></td>)
      : null}
      {row.properties.filter((property: any) => hasColumn(property.typeElementPropertyId))
        .map((cell: any) => 
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

export default Table;
