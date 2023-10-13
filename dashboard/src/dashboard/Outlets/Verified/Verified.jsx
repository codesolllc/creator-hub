import styles from "./Verified.module.css";
import axiosInstance from "../../../../axiosConfig";
import { useEffect, useState } from "react";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import { useOutletContext } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import RatingModal from "../../../components/RatingModal/RatingModal";
import VerifiedBtn from "../../../components/VerifiedBtn/VerifiedBtn";

const Verified = () => {
  const [IsUser, setIsUser] = useState();
  const [creatorData, setCreatorData] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updater, setUpdater] = useState(false);

  const handleRatingModal = (data) => {
    setCreatorData(data);
    setRatingModal(true);
  };
  
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/api/payers");
        if (res.status === 200) {
          console.log();
          setIsUser(
            res.data.filter((item) => item?.userID?.usertype === "creator")
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
        setIsLoading(false);
      }
    })();
  }, [updater]);

  const searchVal = useOutletContext();

  return (
    <>
      <div className="container py-5">
        <div className={`${styles.table_wrapper}`}>
          <table className={`${styles.table_container}`}>
            <thead className={`${styles.table_header}`}>
              <tr>
                <th>Name</th>
                <th>Register</th>
                <th>Email</th>
                <th>State</th>
                <th>Rating</th>
                <th className="text-center">Verification</th>
              </tr>
            </thead>
            <tbody className={`${styles.table_body}`}>
              {IsUser?.filter((item) =>
                item?.userID.name
                  ?.toLowerCase()
                  ?.includes(searchVal?.toLowerCase())
              )?.map((item) => (
                <tr key={item._id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={item?.userID?.profile_Image}
                      className={`${styles.user_avatar} me-3`}
                      alt="user"
                    />
                    {item?.email}
                  </td>
                  <td>{item?.createdAt.split("T")[0]}</td>
                  <td>{item?.userID?.email}</td>
                  <td>{item?.userID?.state}</td>
                  <td>
                    <button
                      className={styles.status_btn_paid}
                      onClick={() => handleRatingModal(item)}
                    >
                      View
                    </button>
                  </td>

                  <td className="text-center">
                    <div className="form-check form-switch d-flex justify-content-center">
                      <VerifiedBtn
                        data={item}
                        updater={updater}
                        setUpdater={setUpdater}
                      />
                    </div>
                  </td>
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
      {ratingModal && (
        <RatingModal setShowModal={setRatingModal} data={creatorData} />
      )}
    </>
  );
};

export default Verified;
