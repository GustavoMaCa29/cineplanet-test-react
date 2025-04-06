import React from "react";
import styles from './Card.module.scss';

interface ProductCardProps {
  product: Product;
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
        <div className={`${styles.imageContainer} text-center mb-2`}>
          {!imageLoaded && (
            <div className={`${styles.spinnerContainer} d-flex justify-content-center align-items-center`}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`img-fluid ${styles.productImage}`}
            onLoad={() => onImageLoad(product.id)}
          />
        </div>

        <h5 className={styles.productTitle}>
          {product.name}
        </h5>
        <p className="small" style={{ fontStyle: "italic" }}>{product.description}</p>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button
              className={`${styles.btnDecrement} btn btn-outline-secondary rounded-circle`}
              onClick={() => onDecrease(product.id)}
              disabled={!quantity}>
              -
            </button>
            <span className={styles.quantity}>
              {quantity}
            </span>
            <button
              className={`${styles.btnIncrement} btn btn-outline-secondary rounded-circle`}
              onClick={() => onIncrease(product.id)}>
              +
            </button>
          </div>
          <span className={`${styles.productPrice} fw-bold`}>
            S/{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;