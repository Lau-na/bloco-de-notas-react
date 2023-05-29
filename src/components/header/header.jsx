import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import GlobalSearchContext from "../../contexts/globalSearchContext";
import Icon from "../icon";
import Service from "../../services/user";

import getUserRole from "../token";

function Header() {
  const { globalSearch, setGlobalSearch } = useContext(GlobalSearchContext);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const role = getUserRole();

  const logout = () => {
    localStorage.clear("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    (async () => {
      const response = await Service.me();
      setUser(response.data);
    })();
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="shadow">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex flex-row align-items-center w-100">
            <Navbar.Brand>
              <Link to="/">
                <Image src="/logo.png" style={{ width: 50 }}></Image>
              </Link>
            </Navbar.Brand>
            <div className="d-flex justify-content-between w-100" style={{ height: 40 }}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Pesquisar"
                  className="me-2"
                  aria-label="Search"
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                />
              </Form>
              <div className="d-flex align-items-center">
                <span>{user?.username}</span>
                <NavDropdown title={<Icon name="person" className="fs-4" />} drop="down">
                  <NavDropdown.Item onClick={() => navigate("/categories")}>
                    Categorias
                  </NavDropdown.Item>
                  {role === "admin" && (
                    <NavDropdown.Item onClick={() => navigate("/users")}>Usuários</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
