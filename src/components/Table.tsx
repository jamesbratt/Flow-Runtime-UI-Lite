import React from 'react';
import Outcome from './Outcome';
import { Guid } from 'guid-typescript';
import { objectData, properties } from '../interfaces/common';

import {
  outcomeResponses,
  pageComponentDataResponses,
  pageComponentResponses,
  column,
} from '../interfaces/invokeResponse';

interface ITable {
  id: string,
  pageComponent: pageComponentResponses,
  pageComponentData: pageComponentDataResponses,
  outcomeResponses: [outcomeResponses],
  setSelected: Function,
}

const Table: React.FC<ITable> = ({ id, pageComponent, pageComponentData, outcomeResponses, setSelected }) => {

  const selectRow = (outcomeId: Guid, objectData: objectData) => {
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

  const outcomes = outcomeResponses.filter((outcome: outcomeResponses) =>
    outcome.pageObjectBindingId === id
  );

  const columns = pageComponent.columns.map((column: column) => 
    <th key={column.label}>{column.label}</th>
  );

  const rows = pageComponentData.objectData.map((row: objectData) => (
    <tr key={row.externalId}>
      {outcomes ? outcomes.map((outcome: outcomeResponses) => 
        <td key={outcome.id}><Outcome key={outcome.id} data={row} outcome={outcome} onClick={selectRow} /></td>)
      : null}
      {row.properties.filter((property: properties) => hasColumn(property.typeElementPropertyId))
        .map((cell: properties) => 
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
