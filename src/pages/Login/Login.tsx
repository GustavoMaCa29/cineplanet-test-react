import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Card, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "../../config/firebaseConfig";

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        navigate("/candy-store");
      } else {
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/candy-store");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setError("Error al iniciar sesión. Intenta de nuevo.");
    }
  };

  const handleContinue = () => {
    navigate("/candy-store");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>

          {error && (
            <Toast
              onClose={() => setError(null)}
              className="mb-3"
              bg="danger"
              style={{ width: "100%" }}
            >
              <Toast.Body>{error}</Toast.Body>
            </Toast>
          )}

          {user ? (
            <>
              <p className="text-center mb-5">Bienvenido, {user.displayName}</p>
              <Button variant="danger" className="w-100" onClick={handleContinue}>
                Ir a la tienda
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" className="w-100 mb-3" onClick={handleContinue}>
                Ingresar como invitado
              </Button>
              <p className="text-center">o continúa con:</p>
              <Button variant="outline-danger" className="w-100" onClick={handleLogin}>
                Google
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;