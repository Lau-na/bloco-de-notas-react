import { ToastContainer, Toast } from "react-bootstrap";

export default function SuccessToast({ message, onClose }) {
  return (
    <ToastContainer position="top-end" className="m-3">
      <Toast
        show={!!message}
        autohide
        delay={3000}
        onClose={onClose}
        bg="success"
      >
        <Toast.Header>
          <strong className="me-auto">Operação bem sucedida</strong>
        </Toast.Header>
        <Toast.Body className="text-light">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
