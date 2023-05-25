import { useCallback } from "react";

import Form from "src/components/Form";
import Note from "src/components/Note";
import { postRequest } from "src/helpers";
import { useStore } from "src/store";

const defaultCategories = ["todo", "feature", "bug"];

const ManagePage = () => {
  const notes = useStore((state) => state.notes);
  const categories = useStore((state) => state.categories);
  const addCategory = useStore((state) => state.addCategory);

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

  return (
    <div>
      {categories && !categories.length && (
        <button onClick={generateCategories}>
          Generate default categories
        </button>
      )}

      <Form />

      <div>
        {notes ? (
          notes.map((note) => <Note key={note._id} note={note} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
