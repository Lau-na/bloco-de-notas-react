import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import GlobalSearchContext from "../../contexts/globalSearchContext";
import Icon from "../icon";

function Header() {
  const { globalSearch, setGlobalSearch } = useContext(GlobalSearchContext);

  const navigate = useNavigate();

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
            <div
              className="d-flex justify-content-between w-100"
              style={{ height: 40 }}
            >
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
              <NavDropdown
                title={<Icon name="person" className="fs-4" />}
                drop="down"
              >
                <NavDropdown.Item onClick={() => navigate("/categories")}>
                  Categorias
                </NavDropdown.Item>
                <NavDropdown.Item>Notas protegidas</NavDropdown.Item>
                <NavDropdown.Item>Exportar</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Sair</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
