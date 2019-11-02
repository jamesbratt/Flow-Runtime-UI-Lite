import React from 'react';

const Table: React.FC = ({ pageComponent, pageComponentDataResponses }: any) => {

  const tableData = pageComponentDataResponses.find((pcdr: any) => 
    pcdr.pageComponentId === pageComponent.id
  );

  const columns = pageComponent.columns.map((column: any) => 
    <th key={column.label}>{column.label}</th>
  );

  const rows = tableData.objectData.map((row: any) => (
    <tr key={row.externalId}>
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

export default Table;
