import { FormEvent, useState } from "react";

import Button from "react-bootstrap/esm/Button";
import BootstrapForm from "react-bootstrap/esm/Form";
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
    <BootstrapForm onSubmit={handleSubmit} id="notesform">
      <BootstrapForm.Group className="mb-1" controlId="formNote">
        <BootstrapForm.Label className="mb-1">Note name:</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          placeholder="Enter note name"
          required
          minLength={5}
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </BootstrapForm.Group>

      <BootstrapForm.Select
        className="mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>--Please choose a category--</option>
        {categories &&
          categories.length &&
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
      </BootstrapForm.Select>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </BootstrapForm>
  );
};

export default Form;
