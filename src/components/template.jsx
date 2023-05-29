import { Navigate } from "react-router-dom";
import Header from "./header/header";
import { Container } from "react-bootstrap";

export const Template = ({ page: Page }) => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="h-100">
      <Header />
      <div className="h-100 py-4">
        <Container className="bg-white p-5 shadow" style={{ minHeight: "85%" }}>
          <Page />
        </Container>
      </div>
    </div>
  );
};
