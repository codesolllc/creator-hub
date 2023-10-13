import styles from "./payments.module.css";
import card_img from "../../../assets/dashboard/master.png";

const Payments = () => {


  return (
    <div className="container py-5">
      <div className={`${styles.table_wrapper}`}>
        <table className={`${styles.table_container}`}>
          <thead className={`${styles.table_header}`}>
            <tr>
              <th>Status</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody className={`${styles.table_body}`}>
            {[0, 1, 2, 3, 4, 5, 7, 8].map((item) => (
              <tr key={item}>
                <td>
                  {" "}
                  <button className={styles.status_btn_paid}>Paid</button>
                </td>

                <td>$ 12,55</td>

                <td>
                  <img
                    src={card_img}
                    className={`${styles.user_card_img} me-3`}
                    alt="method"
                  />
                </td>
                <td>1212124</td>
                <td>Mar 23, 2023</td>
                <td>Plant Name</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
