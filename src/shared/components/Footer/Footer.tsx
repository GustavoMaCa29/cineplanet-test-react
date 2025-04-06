import React from "react";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  const isCandyStore = location.pathname === "/candy-store";

  return (
    <footer className="text-light py-4 mt-auto">
      {!isCandyStore && (
        <>
          <div style={{ background: "#0D1F40" }}>
            <div className="container">
              <div className="row text-center text-md-start">

                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <h5 className="mt-5 mb-5 fw-bold">Nosotros</h5>
                  <ul className="list-unstyled">
                    <li><a href="/quienes-somos" className="text-light text-decoration-none">Conócenos</a></li><br />
                    <li><a href="/contacto" className="text-light text-decoration-none">Trabaja con nosotros</a></li><br />
                    <li><a href="/ubicaciones" className="text-light text-decoration-none">Ventas corporativas</a></li>
                  </ul>
                </div>

                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <h5 className="mt-5 mb-5 fw-bold">Atención al cliente</h5>
                  <ul className="list-unstyled">
                    <li><a href="/ayuda" className="text-light text-decoration-none">Ver mi boleta electrónica</a></li><br />
                    <li><a href="/faq" className="text-light text-decoration-none">Ver mi lista de productos permitidos</a></li>
                  </ul>
                </div>

                <div className="col-12 col-md-4">
                  <h5 className="mt-5 mb-5 fw-bold">Políticas y condiciones</h5>
                  <ul className="list-unstyled">
                    <li><a href="/privacy" className="text-light text-decoration-none">Política de SST</a></li><br />
                    <li><a href="/terms" className="text-light text-decoration-none">Política de sostenibilidad</a></li><br />
                    <li><a href="/cookies" className="text-light text-decoration-none">Política de diversidad e inclusión</a></li><br />
                    <li><a href="/cookies" className="text-light text-decoration-none">Política de privacidad</a></li><br />
                    <li><a href="/cookies" className="text-light text-decoration-none">Condiciones de uso y seguridad</a></li><br />
                    <li><a href="/cookies" className="text-light text-decoration-none">Reglas de convivencia</a></li><br />
                    <li><a href="/cookies" className="text-light text-decoration-none">Términos y condiciones</a></li><br />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "5px", background: "#E50246" }}></div>
        </>
      )}

      <div className="container mt-4">
        <div className="row text-center">
          <div className="col-12 col-md-6 mb-3">
            <p className="fw-bold text-dark">Síguenos en:</p>
            <div>
              <a href="https://facebook.com" className="text-dark mx-2">Facebook</a>
              <a href="https://instagram.com" className="text-dark mx-2">Instagram</a>
              <a href="https://twitter.com" className="text-dark mx-2">Twitter</a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <p className="fw-bold text-dark">Descarga la app:</p>
            <div>
              <a href="/descargar" className="btn btn-dark btn-sm mx-2">App Store</a>
              <a href="/descargar" className="btn btn-dark btn-sm mx-2">Google Play</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;