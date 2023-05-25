import { deleteRequest } from "src/helpers";
import { TNote, useStore } from "src/store";

const Note = ({ note }: { note: TNote }) => {
  const categoriesMap = useStore((state) => state.categoriesMap);
  const removeNote = useStore((state) => state.removeNote);

  const handleDelete = async (id: string) => {
    await deleteRequest(`${process.env.REACT_APP_API_ENDPOINT}/notes`, id);
    removeNote(id);
  };

  return (
    <div>
      <h2>{note.name}</h2>
      {categoriesMap && <span>{categoriesMap[note.category].name}</span>}
      <button onClick={() => handleDelete(note._id)}>Delete</button>
    </div>
  );
};

export default Note;
