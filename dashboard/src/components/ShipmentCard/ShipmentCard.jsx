import styles from "./shipmentcard.module.css";

const ShipmentCard = () => {
  return (
    <div className={`${styles.shipment_card}`}>
      <div
        className={`${styles.shipment_card_head} d-flex justify-content-between`}
      >
        <div className="d-flex">
          <h4>Order ID</h4>
          <span className="ms-2">#123122</span>
        </div>
        <button className={styles.status_btn_progress}>
          <span className={`${styles.pending_btn_circle} mx-1`}></span>On Route
        </button>
        <small className={styles.order_name}>Project Name</small>
      </div>

      {/* lines */}
      <ul className="bar">
        <li>
          <div className="w-100 ms-3 mt-2 d-flex justify-content-between dot-content">
            <span>Japan, Osaka</span>
            <span>10 Feb, 2023</span>
          </div>
        </li>
        <li>
          <div className="w-100 ms-3  mt-2 d-flex justify-content-between">
            <span>Japan, Osaka</span>
            <span>10 Feb, 2023</span>
          </div>
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        <button className={styles.status_btn}>Cost : $2322</button>
        <button className={styles.status_btn}>Contact Seller</button>
      </div>
    </div>
  );
};

export default ShipmentCard;
