import React, { useState, useCallback, useEffect } from "react";
import { Button, Table, Spinner, Placeholder } from "react-bootstrap";
import Icon from "../components/icon";
import service from "../services/user";
import SuccessToast from "../components/toasts/success";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState();
  const [firstLoading, setFirstLoading] = useState(false);
  const [successToastMessage, setSuccessToastMessage] = useState();

  const load = useCallback(async () => {
    setLoading(true);
    const response = await service.list();
    setLoading(false);
    setUsers(response.data);
  }, []);

  useEffect(() => {
    (async () => {
      setFirstLoading(true);
      await load();
      setFirstLoading(false);
    })();
  }, [load]);

  const deleteUser = async (user) => {
    setLoadingId(user.id);
    await service.delete(user.id);
    setLoadingId();
    await load();
    setSuccessToastMessage(`Usuário ${user.username} removido com sucesso`);
  };

  return (
    <div>
      <SuccessToast message={successToastMessage} onClose={() => setSuccessToastMessage()} />
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h3 className="me-3">Usuários</h3>
          {!firstLoading && loading && <Spinner animation="border" />}
        </div>
      </div>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Nome do usuário</th>
            <th className="text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {firstLoading ? (
            <PlaceholderRows />
          ) : (
            users.map((user) => (
              <UsersRow user={user} loadingId={loadingId} deleteUser={deleteUser} />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

const UsersRow = ({ user, loadingId, setSelectedCategory, deleteUser }) => {
  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>
        <div className="d-flex justify-content-around">
          <Button variant="danger" onClick={() => deleteUser(user)}>
            {loadingId === user.id ? (
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
