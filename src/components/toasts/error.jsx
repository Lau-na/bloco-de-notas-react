import { ToastContainer, Toast } from "react-bootstrap";

export default function ErrorToast({ error, onClose }) {
  return (
    <ToastContainer position="top-end" className="m-3">
      <Toast show={!!error} autohide delay={3000} onClose={onClose} bg="danger">
        <Toast.Header>
          <strong className="me-auto">Ops. Ocorreu um problema</strong>
        </Toast.Header>
        <Toast.Body className="text-light">{error}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
