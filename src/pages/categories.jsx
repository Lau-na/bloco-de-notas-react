import React, { useCallback, useEffect, useState } from "react";
import { Button, Table, Spinner, Placeholder } from "react-bootstrap";
import Icon from "../components/icon";
import Category from "../modals/category";
import service from "../services/categories";
import SuccessToast from "../components/toasts/success";

export default function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [successToastMessage, setSuccessToastMessage] = useState();
  const [loadingId, setLoadingId] = useState();
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await service.list();
    setLoading(false);
    setCategories(response.data);
  }, []);

  useEffect(() => {
    (async () => {
      setFirstLoading(true);
      await load();
      setFirstLoading(false);
    })();
  }, [load]);

  const handleSave = async (category) => {
    setShowModal(false);
    setSelectedCategory();
    setSuccessToastMessage(
      `Categoria ${category.description} ${
        category.id ? "atualizada" : "inserida"
      } com sucesso`
    );
    await load();
  };

  const handleHide = () => {
    setShowModal(false);
    setSelectedCategory();
  };

  const deleteCategory = async (category) => {
    setLoadingId(category.id);
    await service.delete(category.id);
    setLoadingId();
    await load();
    setSuccessToastMessage(
      `Categoria ${category.description} removida com sucesso`
    );
  };

  return (
    <div>
      <SuccessToast
        message={successToastMessage}
        onClose={() => setSuccessToastMessage()}
      />
      {showModal && (
        <Category
          category={selectedCategory}
          onSave={handleSave}
          onHide={handleHide}
        />
      )}
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h3 className="me-3">Categorias</h3>
          {!firstLoading && loading && <Spinner animation="border" />}
        </div>
        <Button onClick={() => setShowModal(true)}>Nova Categoria</Button>
      </div>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Descrição</th>
            <th className="text-center">Cor</th>
            <th className="text-center">Ícone</th>
            <th className="text-center" width={120}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {firstLoading ? (
            <PlaceholderRows />
          ) : (
            categories.map((category) => (
              <CategoryRow
                category={category}
                loadingId={loadingId}
                setSelectedCategory={setSelectedCategory}
                setShowModal={setShowModal}
                deleteCategory={deleteCategory}
              />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

const CategoryRow = ({
  category,
  loadingId,
  setSelectedCategory,
  setShowModal,
  deleteCategory,
}) => {
  return (
    <tr key={category.id}>
      <td>{category.description}</td>
      <td>
        <div
          style={{
            backgroundColor: category.color,
            width: 30,
            height: 30,
          }}
          className="rounded-circle m-auto"
        ></div>
      </td>
      <td className="text-center">
        <Icon name={category.icon} className="fs-5" />
      </td>
      <td>
        <div className="d-flex justify-content-around">
          <Button
            onClick={() => {
              setSelectedCategory(category);
              setShowModal(true);
            }}
          >
            <Icon name="pencil-square" />
          </Button>
          <Button variant="danger" onClick={() => deleteCategory(category)}>
            {loadingId === category.id ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <Icon name="trash3-fill" />
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};

const PlaceholderRows = () => {
  const rows = Array(6).fill();
  const columns = Array(4).fill();
  return rows.map((_, index) => (
    <tr key={index}>
      {columns.map((_, index) => (
        <td key={index} className="p-1">
          <Placeholder animation="glow">
            <Placeholder xs={12} className="p-4" />
          </Placeholder>
        </td>
      ))}
    </tr>
  ));
};
