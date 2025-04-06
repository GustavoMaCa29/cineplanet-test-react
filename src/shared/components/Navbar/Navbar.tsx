import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../../../config/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";

const NavigationBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <Navbar variant="dark" expand="lg" className="px-3" style={{background:"#004A8C"}}>
      <Navbar.Brand as={Link} to="/">
        🎬 CineApp
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {}
          <Nav.Link as={"div"}>
            <Link to="/" className="nav-link fw-bold">Inicio</Link>
          </Nav.Link>
          <Nav.Link as={"div"}>
            <Link to="/candy-store" className="nav-link fw-bold">Dulcería</Link>
          </Nav.Link>
        </Nav>

        {user ? (
          <Button variant="outline-light" onClick={handleLogout} className="fw-bold">Cerrar sesión</Button>
        ) : (
          <Button variant="outline-light" as={Link as any} to="/login" className="fw-bold">Iniciar sesión</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
