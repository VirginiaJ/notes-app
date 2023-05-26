import { useCallback, useMemo, useRef } from "react";

import { AgGridReact } from "ag-grid-react";
import Form from "src/components/Form";
import Table from "src/components/Table";
import { deleteRequest, postRequest } from "src/helpers";
import { useStore } from "src/store";

const defaultCategories = ["todo", "feature", "bug"];

const ManagePage = () => {
  const tableRef = useRef<AgGridReact>();
  const selectedNotesRef = useRef<string[]>([]);
  const notes = useStore((state) => state.notes);
  const categories = useStore((state) => state.categories);
  const categoriesMap = useStore((state) => state.categoriesMap);
  const addCategory = useStore((state) => state.addCategory);
  const removeNote = useStore((state) => state.removeNote);

  const noteColumnDefs = useMemo(
    () => [
      { field: "_id", headerName: "id", checkboxSelection: true },
      { field: "name" },
      { field: "category" },
    ],
    []
  );

  const generateCategories = useCallback(() => {
    if (categories && !categories.length) {
      defaultCategories.forEach(async (category) => {
        const res = await postRequest({
          url: `${process.env.REACT_APP_API_ENDPOINT}/categories`,
          data: {
            name: category,
          },
        });
        if (res) addCategory(res);
      });
    }
  }, [categories, addCategory]);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = tableRef.current!.api.getSelectedRows();
    selectedNotesRef.current = selectedRows.map((note) => note._id);
    (document.querySelector("#delete-button") as HTMLButtonElement).disabled =
      selectedNotesRef.current.length === 0;
  }, []);

  const handleDelete = () => {
    selectedNotesRef.current.forEach(async (id) => {
      await deleteRequest(`${process.env.REACT_APP_API_ENDPOINT}/notes`, id);
      removeNote(id);
    });
  };

  return (
    <div>
      {categories && !categories.length && (
        <button onClick={generateCategories}>
          Generate default categories
        </button>
      )}

      <Form />

      <button id="delete-button" disabled={true} onClick={handleDelete}>
        Delete selected
      </button>
      {notes && categoriesMap ? (
        <Table
          ref={tableRef}
          rowData={notes.map((note) => ({
            ...note,
            category: categoriesMap[note.category].name,
          }))}
          columnDefs={noteColumnDefs}
          rowSelection={"multiple"}
          defaultColDef={{ resizable: true }}
          onSelectionChanged={onSelectionChanged}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ManagePage;
