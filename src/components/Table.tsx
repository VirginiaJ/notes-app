import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { forwardRef } from "react";

import { AgGridReact, AgGridReactProps } from "ag-grid-react";

const Table = forwardRef(({ ...props }: AgGridReactProps, ref: any) => (
  <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
    <AgGridReact ref={ref} {...props}></AgGridReact>
  </div>
));

export default Table;
