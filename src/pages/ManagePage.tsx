import { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { createPortal } from "react-dom";
import Form from "src/components/Form";
import Modal from "src/components/Modal";
import Table from "src/components/Table";
import { deleteRequest, postRequest } from "src/helpers";
import { useStore } from "src/store";

const defaultCategories = ["todo", "feature", "bug"];

const ManagePage = () => {
  const tableRef = useRef<AgGridReact>();
  const selectedNotesRef = useRef<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const notes = useStore((state) => state.notes);
  const categories = useStore((state) => state.categories);
  const categoriesMap = useStore((state) => state.categoriesMap);
  const addCategory = useStore((state) => state.addCategory);
  const removeNote = useStore((state) => state.removeNote);

  const noteColumnDefs = useMemo(
    () => [
      { field: "_id", headerName: "Id", checkboxSelection: true, width: 300 },
      { field: "name", width: 600 },
      { field: "category", width: 400 },
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
    selectedNotesRef.current.length === 0
      ? document.querySelector("#delete-button")?.classList.add("disabled")
      : document.querySelector("#delete-button")?.classList.remove("disabled");
  }, []);

  const handleModalClose = () => {
    selectedNotesRef.current = [];
    document.querySelector("#delete-button")?.classList.add("disabled");
    setShowModal(false);
  };

  const handleDelete = () => {
    selectedNotesRef.current.forEach(async (id) => {
      await deleteRequest(`${process.env.REACT_APP_API_ENDPOINT}/notes`, id);
      removeNote(id);
      document.querySelector("#delete-button")?.classList.add("disabled");
      setShowModal(false);
    });
  };

  return (
    <Container className="py-3">
      {categories && !categories.length && (
        <Button className="mb-3" variant="primary" onClick={generateCategories}>
          Generate default categories
        </Button>
      )}

      <Form />

      <Button
        id="delete-button"
        variant="danger"
        className="my-3 disabled"
        onClick={() => setShowModal(true)}
      >
        Delete selected
      </Button>

      {notes && categoriesMap ? (
        <Table
          ref={tableRef}
          rowData={notes.map((note) => ({
            ...note,
            category: categoriesMap[note.category]?.name,
          }))}
          columnDefs={noteColumnDefs}
          rowSelection={"multiple"}
          defaultColDef={{ resizable: true }}
          onSelectionChanged={onSelectionChanged}
          parentStyle={{ height: "60vh", width: "100%" }}
        />
      ) : (
        <div>Loading...</div>
      )}

      {createPortal(
        <Modal show={showModal} handleClose={handleModalClose}>
          <h3 className="m-3 text-center">
            Are you sure you want to delete selected notes?
          </h3>

          <div className="mb-3 mx-3 btn-group">
            <Button variant="secondary" onClick={handleModalClose}>
              No
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal>,
        document.body
      )}
    </Container>
  );
};

export default ManagePage;
