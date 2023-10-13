import { useEffect, useState } from "react";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import style from "./viewGigModal.module.css";
import axiosInstance from "../../../axiosConfig";
import Loader from "../Loader/Loader";

const ViewGigModal = ({ setShowModal, data }) => {
  const [showApplicant, setShowApplicant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicants, setGetApplicants] = useState();
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(
          `/gig/applicants_of_gigs/${data?.authorID?._id}/${data?._id}`
        );
        if (res.status === 200) {
          setGetApplicants(res.data.find_gig_applicants);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="modal_wrapper">
      <div className={`modal_box ${style.modal_inner_box}`}>
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold">Gig Detail</h2>
          <span className="modal_close_btn" onClick={() => setShowModal(false)}>
            X
          </span>
        </div>
        <div className={style.gig_detail_wrapper}>
          <div className="d-flex flex-column align-items-center">
            <img
              src={data?.image}
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
                  {data?.authorID?.name}
                </h4>
              </span>
              <span>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  Title
                </h4>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  {`${data?.title}`}
                </h4>
              </span>
            </div>
            <div className={style.gig_detail}>
              <span>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  Price
                </h4>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  ${data?.price}
                </h4>
              </span>
              <span
                className="flex-column
    justify-content-center
    align-items-center gap-3"
              >
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  Description
                </h4>
                <h4
                  style={{
                    color: "white",
                  }}
                >
                  {data?.description}
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
            View Applicants
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
                  <th>Image</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody className={`${style.table_body}`}>
                {!isLoading &&
                  getApplicants?.map((item) => (
                    <tr key={item?._id}>
                      <td>
                        <img
                          src={item?.applicant_id?.profile_Image}
                          className={`${style.user_card_img} me-3`}
                          alt="method"
                        />
                      </td>

                      <td> {item?.applicant_id?.name}</td>
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
      </div>
    </div>
  );
};

export default ViewGigModal;
