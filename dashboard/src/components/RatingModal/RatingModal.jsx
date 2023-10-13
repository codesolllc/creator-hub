import { useEffect, useState } from "react";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import style from "./viewGigModal.module.css";
import axiosInstance from "../../../axiosConfig";
import Loader from "../Loader/Loader";

const RatingModal = ({ setShowModal, data }) => {
  const [showApplicant, setShowApplicant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getRating, setGetRating] = useState();
  const [getReviews, setGetReviews] = useState();

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/ratings/get_creator_ratings/${data?._id}`
        );
        if (res.status === 200) {
          setGetRating(res.data.all_creator_Ratings);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
        setIsLoading(false);
      }
    })();
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/review/get_creator_reviews/${data?._id}`
        );
        if (res.status === 200) {
          setGetReviews(res.data.all_creator_reviews);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
        setIsLoading(false);
      }
    })();
  }, []);

  const ratingsArray = getRating?.map((item) => item.ratings) || [];
  const totalRating = ratingsArray.reduce((acc, ratings) => acc + ratings, 0);
  const averageRating = totalRating / (ratingsArray.length || 1);

  console.log(getReviews, "sfsfsfsfsdf");

  return (
    <div className="modal_wrapper">
      <div className={`modal_box ${style.modal_inner_box}`}>
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold">Creator Detail</h2>
          <span className="modal_close_btn" onClick={() => setShowModal(false)}>
            X
          </span>
        </div>
        <div className={style.gig_detail_wrapper}>
          <div className="d-flex flex-column align-items-center">
            <img
              src={data?.profile_Image}
              alt="no img found"
              className={style.gig_img}
            />
            <div className={style.gig_detail}>
              <span>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  Name
                </h4>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  {data?.name}
                </h4>
              </span>
              <span>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  Ratings
                </h4>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  {averageRating === 0
                    ? "No rating"
                    : "⭐".repeat(averageRating)}
                </h4>
              </span>
            </div>
          </div>
        </div>
        <div className={style.Btn_div}>
          <button
            className={style.view_applicant_btn}
            onClick={() => setShowApplicant(!showApplicant)}
          >
            View Reviews
          </button>
        </div>

        <div
          className={
            showApplicant ? `${style.applicant_active}` : `${style.applicant}`
          }
        >
          <div className={`${style.table_wrapper}`}>
            <table className={`${style.table_container}`}>
              <thead className={`${style.table_header}`}>
                <tr>
                  <th>User</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody className={`${style.table_body}`}>
                {!isLoading && getReviews?.length === 0 ? (
                  <tr>
                    <td>No any Reviews</td>
                  </tr>
                ) : (
                  getReviews?.map((item) => (
                    <tr key={item?._id}>
                      <td className="d-flex align-items-center ">
                        <img
                          src={item?.user_id?.profile_Image}
                          className={`${style.user_card_img} me-3`}
                          alt="method"
                        />
                        <span>{item?.user_id?.name}</span>
                      </td>

                      <td> {item?.review}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {isLoading && (
              <div className="text-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
