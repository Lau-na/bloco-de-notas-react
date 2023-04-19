import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Card, Col, Row, Button, Spinner, Placeholder } from "react-bootstrap";
import NoteModal from "../modals/note";
import Icon from "../components/icon";
import GlobalSearchContext from "../contexts/globalSearchContext";
import ErrorToast from "../components/toasts/error";
import SuccessToast from "../components/toasts/success";
import service from "../services/notes";
import { debounce } from "lodash";

import styles from "./notes.module.css";

export default function Notes() {
  const { globalSearch } = useContext(GlobalSearchContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState();
  const [successToastMessage, setSuccessToastMessage] = useState();
  const [firstLoading, setFirstLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState();

  const search = useCallback(
    debounce(async (search) => {
      try {
        setLoading(true);
        const response = await service.list(search);
        setLoading(false);
        setFirstLoading(false);
        const notes = response.data.map((note) => {
          note.date = new Date(note.date);
          return note;
        });
        setNotes(notes);
      } catch (error) {
        setError(error?.response?.data ?? "Erro ao se conectar ao servidor");
      }
    }, 300),
    []
  );

  const load = useCallback(() => search(globalSearch), [globalSearch]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (note) => {
    setShowModal(false);
    setSelectedNote();
    setSuccessToastMessage(
      `Nota ${note.title} ${note.id ? "atualizada" : "inserida"} com sucesso`
    );
    await load();
  };

  const handleHide = () => {
    setShowModal(false);
    setSelectedNote();
  };

  const deleteNote = async (note) => {
    setLoadingId(note.id);
    await service.delete(note.id);
    setLoadingId();
    setSuccessToastMessage(`Nota ${note.title} removida com sucesso`);
    await load();
  };

  return (
    <div>
      <SuccessToast
        message={successToastMessage}
        onClose={() => setSuccessToastMessage()}
      />
      <ErrorToast error={error} onClose={() => setError()} />
      {showModal && (
        <NoteModal
          note={selectedNote}
          onSave={handleSave}
          onHide={handleHide}
        />
      )}
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h3 className="me-3">Anotações</h3>
          {!firstLoading && loading && <Spinner animation="border" />}
        </div>
        <Button onClick={() => setShowModal(true)}>Nova Anotação</Button>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {firstLoading ? (
          <PlaceholderGrid />
        ) : (
          notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              loadingId={loadingId}
              setSelectedNote={setSelectedNote}
              setShowModal={setShowModal}
              deleteNote={deleteNote}
            />
          ))
        )}
      </Row>
    </div>
  );
}

const Note = ({
  note,
  loadingId,
  setSelectedNote,
  setShowModal,
  deleteNote,
}) => {
  return (
    <Col>
      <Card
        className={styles.card}
        style={{
          backgroundColor: note.category.color,
          cursor: "pointer",
        }}
        onClick={() => {
          setSelectedNote(note);
          setShowModal(true);
        }}
      >
        <Card.Header>
          <Row className="align-items-center">
            <Col xs={8} xl={6}>
              <Card.Title className="mb-0">
                <Icon name={note.category.icon} className="me-2" />
                {note.title}
              </Card.Title>
            </Col>
            <Col xs={0} xl={4} className="text-end d-none d-xl-block">
              {note.date.toLocaleDateString()}
            </Col>
            <Col xs={4} xl={2} className="text-end">
              <Button
                id="deleteNote"
                variant="outline-dark"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteNote(note);
                }}
              >
                {loadingId === note.id ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <Icon name="trash3-fill" />
                )}
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className={styles["card-body"]}>
          <Card.Text className={styles["card-text"]}>{note.text}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const PlaceholderGrid = () => {
  const items = Array(6).fill();
  return items.map((_, index) => (
    <Placeholder key={index} animation="glow">
      <Placeholder xs={12} className={styles.card} />
    </Placeholder>
  ));
};
