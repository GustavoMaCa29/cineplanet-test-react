import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { initiatePayment, completePayment } from "../../api/paymentApi";
import { useCartStore } from "../../stores/useCartStore";

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const { total } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    email: "",
    name: "",
    documentType: "DNI",
    documentNumber: "",
    amount: total,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setFormData((prev) => ({
          ...prev,
          name: parsedUser.displayName || "",
          email: parsedUser.email || "",
        }));
      } catch (error) {
        console.error("Error al parsear usuario:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { cardNumber, cvv, documentNumber, expiration } = formData;

    if (!cardNumber || !cvv || !documentNumber) {
      Swal.fire("Error", "Por favor, complete todos los campos requeridos", "error");
      setLoading(false);
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      Swal.fire("Error", "El número de tarjeta debe contener solo números y tener 16 dígitos", "error");
      setLoading(false);
      return;
    }

    if (!/^\d+$/.test(documentNumber)) {
      Swal.fire("Error", "El número de documento debe contener solo números", "error");
      setLoading(false);
      return;
    }

    if (!cardNumber || !cvv || !documentNumber) {
      Swal.fire("Error", "Por favor, complete todos los campos requeridos", "error");
      setLoading(false);
      return;
    }

    const expirationRegex = /^\d{4}\/\d{2}$/;
    if (!expirationRegex.test(expiration)) {
      Swal.fire("Error", "La fecha de expiración debe tener el formato YYYY/MM", "error");
      setLoading(false);
      return;
    }

    const [yearStr, monthStr] = expiration.split("/");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const now = new Date();
    const expirationDate = new Date(year, month - 1);

    if (
      isNaN(year) ||
      isNaN(month) ||
      month < 1 ||
      month > 12 ||
      expirationDate < new Date(now.getFullYear(), now.getMonth())
    ) {
      Swal.fire("Error", "La fecha de expiración no es válida o ya está vencida", "error");
      setLoading(false);
      return;
    }

    try {
      const paymentResponse = await initiatePayment(formData);

      if (paymentResponse && paymentResponse.code === "SUCCESS") {
        const { transactionId, operationDate } = paymentResponse.transactionResponse;

        const completePayload = {
          email: formData.email,
          name: formData.name,
          documentNumber: formData.documentNumber,
          transactionId,
          operationDate,
        };

        const completeResponse = await completePayment(completePayload);

        if (completeResponse.code === "0") {
          Swal.fire("¡Compra completada!", "Gracias por tu compra.", "success").then(() => {
            navigate("/");
          });
        } else {
          Swal.fire("Error", "Error al completar la transacción.", "error");
        }
      } else {
        Swal.fire("Error", "No se pudo procesar el pago.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Hubo un problema en el proceso de pago.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-3"></div>

        <div className="col-12 col-md-6">
          <h2 className="text-center mb-4 fw-bold">Formulario de Pago</h2>
          <form onSubmit={handleSubmit} className="bg-light p-5 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Número de tarjeta</label>
              <input
                type="text"
                name="cardNumber"
                maxLength={16}
                value={formData.cardNumber}
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de expiración</label>
                <input
                  type="text"
                  name="expiration"
                  value={formData.expiration}
                  className="form-control"
                  placeholder="YYYY/MM"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  maxLength={4}
                  value={formData.cvv}
                  className="form-control"
                  placeholder="YYY"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Tipo de documento</label>
                <select
                  name="documentType"
                  className="form-select"
                  value={formData.documentType}
                  onChange={handleChange}
                >
                  <option value="DNI">DNI</option>
                  <option value="CE">CE</option>
                  <option value="PAS">PAS</option>
                </select>
              </div>
              <div className="col-md-8 mb-3">
                <label className="form-label">Número de documento</label>
                <input
                  type="text"
                  name="documentNumber"
                  maxLength={8}
                  value={formData.documentNumber}
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-5" disabled={loading || total <= 0}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Procesando...
                </>
              ) : (
                `Confirmar pago de S/${total.toFixed(2)} soles`
              )}
            </button>
          </form>
        </div>

        <div className="col-12 col-md-3"></div>
      </div>
    </div>
  );
};

export default PaymentForm;