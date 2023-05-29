import jwtDecode from "jwt-decode";

export default function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const { role } = jwtDecode(token);
  return role;
}
