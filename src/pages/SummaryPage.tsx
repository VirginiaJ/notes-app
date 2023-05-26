import { useMemo } from "react";

import Container from "react-bootstrap/esm/Container";
import Table from "src/components/Table";
import { useStore } from "src/store";

const SummaryPage = () => {
  const notes = useStore((state) => state.notes);
  const categories = useStore((state) => state.categories);

  const rowData = useMemo(
    () =>
      categories?.map((category) => {
        const notesInCategory = notes?.filter(
          (note) => note.category === category._id
        );
        return { category: category.name, count: notesInCategory?.length };
      }),
    [categories, notes]
  );

  const summaryColumnDefs = useMemo(
    () => [{ field: "category" }, { field: "count" }],
    []
  );

  return (
    <Container className="py-3">
      {notes && categories ? (
        <>
          {categories.length ? (
            <Table
              rowData={rowData ?? []}
              columnDefs={summaryColumnDefs}
              parentStyle={{ height: "90vh", width: "402px" }}
            />
          ) : (
            <div>No categories created</div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default SummaryPage;
