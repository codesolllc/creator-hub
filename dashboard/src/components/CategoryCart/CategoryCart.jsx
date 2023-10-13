import { useEffect, useState } from "react";
import styles from "./productcart.module.css";
import ProductUpdateModal from "../CategoryUpdateModal/CategoryUpdateModal";
const ProductCart = ({ data, refresher }) => {
  const [productUpdateModal, setProductUpdateModal] = useState(false);


  return (
    <>
      <div className={`${styles.product_cartbox} card`}>
        <img
          src={`${data?.category_image}`}
          className="card-img-top"
          alt="prd_img"
        />
        <div className="card-body">
          <div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">{data?.category_name}</span>
              <span
                className={styles.cart_button}
                onClick={() => setProductUpdateModal(true)}
              >
                Update
              </span>
            </div>
            <div className="d-flex justify-content-between mt-3">
             
            </div>
          </div>
        </div>
      </div>
      {productUpdateModal && (
        <ProductUpdateModal setShowModal={setProductUpdateModal} data={data} refresher={refresher} />
      )}
    </>
  );
};

export default ProductCart;
