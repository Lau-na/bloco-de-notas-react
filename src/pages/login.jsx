import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Service from "../services/login";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await Service.login({ username, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center h-100">
      <Form onSubmit={handleSubmit} className="p-4 mx-auto bg-light rounded" style={{ width: 500 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <span className="d-block text-danger mb-2">{error}</span>
        <Button title="Entrar" loading={loading} />
      </Form>
    </div>
  );
}
