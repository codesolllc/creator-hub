import styles from "./payment.module.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosConfig";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import Loader from "../../../components/Loader/Loader";
import { useOutletContext } from "react-router-dom";
import ViewProposalModal from "../../../components/ViewProposalModal/ViewProposalModal";

const Payment = () => {
  const [allGigs, setAllGigs] = useState();
  const [filterRole, setFilterRole] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [ViewModal, setViewModal] = useState(false);
  const [data, setData] = useState();
  const handleGigId = (item) => {
    setViewModal(true);
    setData(item);
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/api//payers");
        if (res.status === 200) {
          setAllGigs(res?.data);
          console.log(res?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
        setIsLoading(false);
      }
    })();
  }, []);
  const searchVal = useOutletContext();
  console.log(allGigs);
  return (
    <div className="container py-5">
      <div className="text-end">
        <select
          className={styles.filter_select}
          onChange={(e) => setFilterRole(e.target.value)}
          value={filterRole}
        >
          <option value="all">All</option>
          <option value="hire">Hire</option>
          <option value="products">Products</option>
          <option value="user-verification">Verified User</option>
        </select>
      </div>
      <div className={`${styles.table_wrapper}`}>
        <table className={`${styles.table_container}`}>
          <thead className={`${styles.table_header}`}>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Email</th>
              <th>Payment ID</th>
              <th>Card NO.</th>
            </tr>
          </thead>
          <tbody className={`${styles.table_body}`}>
            {allGigs
              ?.filter(
                (item) =>
                  item?.userID?.name
                    ?.toLowerCase()
                    ?.includes(searchVal?.toLowerCase()) &&
                  (filterRole === "all" || item.payment_type === filterRole)
              )
              ?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item?.userID?.profile_Image}
                      className={`${styles.user_card_img} me-3`}
                      alt="method"
                    />
                    {item?.userID?.name}
                  </td>

                  <td>${item?.amount}</td>

                  <td>{item.createdAt.split("T")[0]}</td>

                  <td>{item?.payment_type}</td>
                  <td>{item?.email}</td>
                  <td>{item?.payment_Id}</td>
                  <td>{item?.card_number}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="text-center">
            <Loader />
          </div>
        )}
      </div>
      {ViewModal && (
        <ViewProposalModal
          setShowModal={setViewModal}
          ViewModal={ViewModal}
          data={data}
          // isLoading={isLoading}
          // setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default Payment;
