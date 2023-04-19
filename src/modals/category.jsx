import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Dropdown,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Icon from "../components/icon";
import icons from "../icons.json";
import ErrorList from "../components/errorList";
import service from "../services/categories";

export default function Category({ category, onSave, onHide }) {
  const [description, setDescription] = useState(category?.description ?? "");
  const [color, setColor] = useState(category?.color ?? "#000000");
  const [icon, setIcon] = useState(category?.icon ?? "");
  const [errors, setErrors] = useState([]);
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetValues = () => {
    setDescription("");
    setColor("");
    setIcon("");
  };

  const save = async (category) => {
    if (category.id) {
      await service.update(category);
    } else {
      await service.insert(category);
    }
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setLoading(true);
      const payload = { ...category, description, icon, color };
      await save(payload);
      setLoading(false);
      await onSave(payload);
    }
  };

  const validateFields = () => {
    const errors = [];

    if (description == "") {
      errors.push("Descrição é obrigatória");
    }

    if (icon == "") {
      errors.push("Ícone é obrigatório");
    }

    setErrors(errors);

    return errors.length === 0;
  };

  useEffect(() => {
    if (errors.length > 0) setErrors([]);
  }, [description, color, icon]);

  const toggleIconDropdown = () => {
    setShowIconDropdown((show) => !show);
  };

  const closeIconDropdown = () => {
    setShowIconDropdown(false);
  };

  return (
    <Modal
      show
      onHide={() => {
        resetValues();
        onHide();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {category
            ? `Editando Categoria ${category.description}`
            : "Nova Categoria"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="description">Descrição:</Form.Label>
            <Form.Control
              type="text"
              id="description"
              value={description}
              maxLength={30}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="color">Cor:</Form.Label>
            <Form.Control
              type="color"
              id="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label htmlFor="icon">Ícone:</Form.Label>
          </Form.Group>

          <Dropdown show={showIconDropdown}>
            <Dropdown.Toggle variant="outline" onClick={toggleIconDropdown}>
              {icon ? <Icon name={icon} /> : "Selecione..."}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Row className="p-2">
                {icons.map((icon) => (
                  <Col key={icon} sm={2} className="text-center my-1">
                    <Button
                      variant="light"
                      onClick={() => {
                        closeIconDropdown();
                        setIcon(icon);
                      }}
                    >
                      <Icon name={icon} />
                    </Button>
                  </Col>
                ))}
              </Row>
            </Dropdown.Menu>
          </Dropdown>
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
