import { useStore } from "src/store";

const SummaryPage = () => {
  const notes = useStore((state) => state.notes);
  const categories = useStore((state) => state.categories);

  return (
    <div>
      {notes && categories ? (
        categories.map((category) => {
          const notesInCategory = notes?.filter(
            (note) => note.category === category._id
          );
          return (
            <div key={category._id}>
              <h2>{category.name}</h2>
              <span>{notesInCategory?.length}</span>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SummaryPage;
