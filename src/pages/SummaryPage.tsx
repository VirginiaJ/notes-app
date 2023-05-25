import { useMemo } from "react";

import Table from "src/components/Table";
import { useStore } from "src/store";

const SummaryPage = () => {
  const notes = useStore((state) => state.notes);
  const categories = useStore((state) => state.categories);

  const rowData = useMemo(() => {
    const data = {} as Record<string, number>;
    if (!categories || !notes) return data;
    categories.forEach((category) => {
      const notesInCategory = notes?.filter(
        (note) => note.category === category._id
      );
      data[category.name] = notesInCategory.length;
    });
    return data;
  }, [categories, notes]);

  const categoriesColumnDefs = useMemo(
    () =>
      categories
        ? categories.map((category) => ({ field: category.name }))
        : [],
    [categories]
  );

  return (
    <div>
      {notes && categories ? (
        <>
          {categories.length ? (
            <Table rowData={[rowData]} columnDefs={categoriesColumnDefs} />
          ) : (
            <div>No categories created</div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SummaryPage;
