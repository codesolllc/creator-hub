import styles from "./recommended.module.css";
import axiosInstance from "../../../../axiosConfig";
import { useEffect, useState } from "react";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import { useOutletContext } from "react-router-dom";
import RatingModal from "../../../components/RatingModal/RatingModal";
import ReccomendBtn from "../../../components/ReccomendBtn/ReccomendBtn";

const recommended = () => {
  const [IsUser, setIsUser] = useState();
  const [creatorData, setCreatorData] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState();
  const [recommendResponse, setRecommendResponse] = useState(false);

  const handleRatingModal = (data) => {
    setCreatorData(data);
    setRatingModal(true);
  };
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/auth/get_user");
        if (res.status === 200) {
          setIsUser(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
        setIsLoading(false);
      }
    })();
  }, [recommendResponse]);

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
                <th className="text-center">recommend</th>
              </tr>
            </thead>
            <tbody className={`${styles.table_body}`}>
              {IsUser?.filter((item) => item.usertype === "creator")
                ?.filter((item) =>
                  item?.name?.toLowerCase()?.includes(searchVal?.toLowerCase())
                )
                ?.map((item) => (
                  <tr key={item._id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.profile_Image}
                        className={`${styles.user_avatar} me-3`}
                        alt="user"
                      />
                      {item.name}
                    </td>
                    <td>{item.createdAt.split("T")[0]}</td>
                    <td>{item.email}</td>
                    <td>{item.state}</td>
                    <td>
                      <button
                        className={styles.status_btn_paid}
                        onClick={() => handleRatingModal(item)}
                      >
                        View
                      </button>
                    </td>

                    <td className="text-center">
                      {/* <span className="f-bolder"> */}
                      <div className="form-check form-switch d-flex justify-content-center">
                        <ReccomendBtn
                          data={item}
                          updater={setRecommendResponse}
                          recommendResponse={recommendResponse}
                          isLoading={isLoading}
                        />
                      </div>
                      {/* </span> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {ratingModal && (
        <RatingModal setShowModal={setRatingModal} data={creatorData} />
      )}
    </>
  );
};

export default recommended;
