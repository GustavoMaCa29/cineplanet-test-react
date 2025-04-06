import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCandyProducts } from "../../hooks/useCandyProducts";
import ProductCard from "../../shared/components/Card/Card";
import { useCartStore } from "../../stores/useCartStore";

const CandyStore: React.FC = () => {
  const { products, loading, error } = useCandyProducts();
  const [imageLoaded, setImageLoaded] = useState<{ [id: number]: boolean }>({});
  const { addToCart, updateQuantity, total, cart } = useCartStore();
  const navigate = useNavigate();

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

  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    addToCart(product);
    useCartStore.getState().calculateTotal();
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
    useCartStore.getState().calculateTotal();
  };

  const selectedProducts = cart;

  const validProducts = selectedProducts.filter((product) => product.price * product.quantity > 0);

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
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={cart.find((item) => item.id === product.id)?.quantity || 0}
                      onIncrease={() => handleAddToCart(product)}
                      onDecrease={() => handleUpdateQuantity(product.id, (cart.find((item) => item.id === product.id)?.quantity || 1) - 1)}
                      imageLoaded={imageLoaded[product.id]}
                      onImageLoad={(id) => setImageLoaded((prev) => ({ ...prev, [id]: true }))}
                    />
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
          ) : selectedProducts.length === 0 || total === 0  ? (
            <p className="text-center">No hay productos seleccionados.</p>
          ) : (
            <div>
              <ul className="list-group mb-3">
                {validProducts.map((product) => (
                  <li key={product.id} className="list-group-item d-flex justify-content-between">
                    <span>
                      {product.quantity} x {product.name}
                    </span>
                    <strong>S/{(product.price * product.quantity).toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">Total: S/{total.toFixed(2)}</h5>
              <button
                className="btn w-100 mt-3 text-light rounded"
                onClick={handleGoToPayment}
                style={{ background: "#E50246" }}
              >
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