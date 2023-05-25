import { FormEvent, useState } from "react";

import { postRequest } from "src/helpers";
import { useStore } from "src/store";

const Form = () => {
  const categories = useStore((state) => state.categories);
  const addNote = useStore((state) => state.addNote);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await postRequest({
      url: `${process.env.REACT_APP_API_ENDPOINT}/notes`,
      data: {
        name,
        category,
      },
    });

    if (res && res._id) {
      addNote({ name, category, _id: res._id });
    }
    setName("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} id="notesform">
      <label htmlFor="name">Note name:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label htmlFor="categories">Choose a category:</label>
      <select
        name="categories"
        id="categories"
        form="notesform"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">--Please choose an option--</option>
        {categories &&
          categories.length &&
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default Form;
