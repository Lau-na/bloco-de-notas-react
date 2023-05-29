import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import CategoryService from "../services/categories";
import ErrorList from "../components/errorList";
import service from "../services/notes";

export default function Note({ note, onSave, onHide }) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [categoryId, setCategoryId] = useState(note?.category?.id ?? 0);
  const [text, setText] = useState(note?.text ?? "");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetValues = () => {
    setTitle("");
    setText("");
    setCategoryId(0);
  };

  useEffect(() => {
    (async () => {
      const response = await CategoryService.list();
      setCategories(response.data);
    })();
  }, []);

  const save = async (note) => {
    if (note.id) {
      await service.update(note);
    } else {
      await service.insert(note);
    }
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setLoading(true);
      const payload = {
        ...note,
        title,
        categoryId,
        text,
        date: new Date(),
      };
      await save(payload);
      setLoading(false);
      await onSave(payload);
    }
  };

  const validateFields = () => {
    const errors = [];

    if (title == "") {
      errors.push("Título é obrigatório.");
    }

    if (categoryId === 0) {
      errors.push("Categoria é obrigatória.");
    }

    if (text == "") {
      errors.push("Texto é obrigatório.");
    }

    setErrors(errors);
    return errors.length === 0;
  };

  useEffect(() => {
    if (errors.length > 0) setErrors([]);
  }, [title, categoryId, text]);

  return (
    <Modal
      show
      onHide={() => {
        resetValues();
        onHide();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{note ? `Editando Anotação ${note.title}` : "Nova Anotação"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="title">Título:</Form.Label>
            <Form.Control
              type="text"
              id="title"
              value={title}
              maxLength={30}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="category">Categoria:</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(event) => {
                setCategoryId(parseInt(event.target.value));
              }}
            >
              <option key={0} value={0} disabled>
                Selecione...
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="text">Texto:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="text"
              value={text}
              maxLength={4000}
              onChange={(event) => setText(event.target.value)}
            />
          </Form.Group>
        </Form>
        <ErrorList errors={errors} />
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit} disabled={loading}>
          Salvar
          {loading && <Spinner animation="border" className="ms-3" size="sm" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
