import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { getCandyProducts } from "../api/candyStoreApi";
import Swal from "sweetalert2";

interface CandyProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const CandyStore: React.FC = () => {
  const [products, setProducts] = useState<CandyProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [imageLoaded, setImageLoaded] = useState<{ [id: number]: boolean }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("candyCart");
    if (savedCart) {
      setQuantities(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCandyProducts();
        setProducts(data);
      } catch (error: any) {
        console.error(error);
        setError("Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("candyCart", JSON.stringify(quantities));
  }, [quantities]);

  const handleIncrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id: number) => {
    setQuantities((prev) => {
      if (!prev[id]) return prev;
      const updatedCount = prev[id] - 1;
      if (updatedCount <= 0) {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      }
      return { ...prev, [id]: updatedCount };
    });
  };

  const selectedProducts = products.filter(
    (product) => (quantities[product.id] || 0) > 0
  );

  const total = selectedProducts.reduce(
    (acc, product) => acc + product.price * (quantities[product.id] || 0),
    0
  );

  const handleGoToPayment = () => {
    Swal.fire({
      title: "Confirmar pago",
      text: `El monto total a pagar es S/. ${total.toFixed(2)}`,
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Continuar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/payment");
      }
    });
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-md-8 p-4 overflow-auto" style={{ background: "#f0f0f0" }}>
          <div className="container">
            <h2 className="mb-4 text-dark fw-bold">Dulcería</h2>
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4">
                      <div className="bg-white p-3 h-100">
                        <Skeleton height={150} className="mb-2" />
                        <Skeleton height={20} width="80%" />
                        <Skeleton height={15} width="60%" className="mb-2" />
                        <Skeleton height={30} width="100%" />
                      </div>
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-lg-4 mb-4">
                      <div className="bg-white text-dark p-3 h-100">
                        <div className="text-center mb-2" style={{ minHeight: "150px" }}>
                          {!imageLoaded[product.id] && (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                              </div>
                            </div>
                          )}
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid"
                            style={{
                              maxHeight: "150px",
                              display: imageLoaded[product.id] ? "block" : "none",
                            }}
                            onLoad={() =>
                              setImageLoaded((prev) => ({
                                ...prev,
                                [product.id]: true,
                              }))
                            }
                          />
                        </div>
                        <h5 style={{ color: "#004A8C", fontWeight: "bold", fontFamily: "Montserrat" }}>
                          {product.name}
                        </h5>
                        <p className="small" style={{ fontStyle: "italic" }}>{product.description}</p>

                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <button
                              className="btn btn-outline-secondary rounded-circle"
                              style={{
                                width: "35px",
                                height: "35px",
                                fontSize: "1.2rem",
                                padding: "0",
                                marginRight: "8px",
                              }}
                              onClick={() => handleDecrease(product.id)}
                              disabled={!quantities[product.id]}
                            >
                              -
                            </button>
                            <span className="mx-2" style={{ color: "#004A8C", fontWeight: "bold" }}>
                              {quantities[product.id] || 0}
                            </span>
                            <button
                              className="btn btn-outline-primary rounded-circle"
                              style={{
                                width: "35px",
                                height: "35px",
                                fontSize: "1.2rem",
                                padding: "0",
                                marginLeft: "8px",
                              }}
                              onClick={() => handleIncrease(product.id)}
                            >
                              +
                            </button>
                          </div>
                          <span className="fw-bold" style={{ color: "#004A8C" }}>
                            S/{product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 bg-light p-4 overflow-auto">
          <h4 className="text-center mb-4 fw-bold">Resumen de Compra</h4>

          {loading ? (
            <div>
              <Skeleton height={30} count={3} className="mb-2" />
              <Skeleton height={40} width="50%" />
            </div>
          ) : selectedProducts.length === 0 ? (
            <p className="text-center">No hay productos seleccionados.</p>
          ) : (
            <div>
              <ul className="list-group mb-3">
                {selectedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {quantities[product.id]} x {product.name}
                    </span>
                    <strong>
                      S/{(product.price * quantities[product.id]).toFixed(2)}
                    </strong>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">Total: S/{total.toFixed(2)}</h5>
              <button className="btn w-100 mt-3 text-light rounded" onClick={handleGoToPayment} style={{ background: "#E50246" }}>
                Ir a pagar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandyStore;