import React from "react";

interface ProductCardProps {
  product: CandyProduct;
  quantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  imageLoaded: boolean;
  onImageLoad: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  imageLoaded,
  onImageLoad,
}) => {
  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <div className="bg-white text-dark p-3 h-100">
        <div className="text-center mb-2" style={{ minHeight: "150px" }}>
          {!imageLoaded && (
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
              display: imageLoaded ? "block" : "none",
            }}
            onLoad={() => onImageLoad(product.id)}
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
              onClick={() => onDecrease(product.id)}
              disabled={!quantity}
            >
              -
            </button>
            <span className="mx-2" style={{ color: "#004A8C", fontWeight: "bold" }}>
              {quantity}
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
              onClick={() => onIncrease(product.id)}
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
  );
};

export default ProductCard;