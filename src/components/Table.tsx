import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react";

interface ITableProps {
  rowData: any[];
  columnDefs: any[];
}

const Table = ({ rowData, columnDefs }: ITableProps) => (
  <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={{ resizable: true }}
      rowSelection={"multiple"}
    ></AgGridReact>
  </div>
);

export default Table;
