import styles from "./payment.module.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosConfig";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import Loader from "../../../components/Loader/Loader";
import { useOutletContext } from "react-router-dom";

const ActiveCardUser = () => {
  const [allGigs, setAllGigs] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/usercards/get_all_user_cards");
        if (res.status === 200) {
          setAllGigs(res?.data?.findcard);
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

  return (
    <div className="container py-5">
      <div className={`${styles.table_wrapper}`}>
        <table className={`${styles.table_container}`}>
          <thead className={`${styles.table_header}`}>
            <tr>
              <th>User</th>
              <th className="text-center">CVC</th>
              <th className="text-center">Expire Month</th>
              <th className="text-center">Expire Year</th>
              <th>card # </th>
            </tr>
          </thead>
          <tbody className={`${styles.table_body}`}>
            {allGigs
              ?.filter((item) =>
                item?.userID?.name
                  ?.toLowerCase()
                  ?.includes(searchVal?.toLowerCase())
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
                  <td className="text-center">${item?.card_cvc}</td>
                  <td className="text-center">${item?.card_exp_month}</td>
                  <td className="text-center">${item?.card_exp_year}</td>
                  <td>${item?.card_number}</td>
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
    </div>
  );
};

export default ActiveCardUser;
