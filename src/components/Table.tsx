import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { CSSProperties, forwardRef } from "react";

import { AgGridReact, AgGridReactProps } from "ag-grid-react";

const Table = forwardRef(
  (
    {
      parentStyle,
      ...props
    }: AgGridReactProps & { parentStyle: CSSProperties },
    ref: any
  ) => (
    <div className="ag-theme-alpine" style={parentStyle}>
      <AgGridReact ref={ref} {...props}></AgGridReact>
    </div>
  )
);

export default Table;
