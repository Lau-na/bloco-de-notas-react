import React from "react";
import * as Bootstrap from "react-bootstrap";

export const Button = ({ title, onClick, loading }) => (
  <Bootstrap.Button type="submit" onClick={onClick} disabled={loading}>
    {title}
    {loading && <Bootstrap.Spinner animation="border" className="ms-3" size="sm" />}
  </Bootstrap.Button>
);
