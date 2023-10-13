import { useEffect, useState } from "react";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import style from "./viewGigModal.module.css";
import axiosInstance from "../../../axiosConfig";
import Loader from "../Loader/Loader";

const ViewProposalModal = ({ setShowModal, data }) => {
  const [showApplicant, setShowApplicant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicants, setGetApplicants] = useState();
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/hire/get_qutations/${data?._id}`);
        if (res.status === 200) {
          setGetApplicants(res?.data?.findQutations);
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
          <div className="d-flex flex-column align-items-center w-100">
            <div className={style.Btn_div}>
              <a target="_blank" href={data?.document_or_picture} className={style.view_applicant_btn} style={{color:"black", textDecoration:"none"}}>
                Download Document
              </a>
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
                  ${data?.desired_amount}
                </h4>
              </span>
              <span className="flex-column justify-content-center align-items-center gap-3">
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
                  {data?.work_detail}
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
            View Quotation
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
                  <th>Quotation</th>
                  <th>Status</th>
                  <th>Accepted</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className={`${style.table_body}`}>
                {!isLoading &&
                  getApplicants?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={item?.userID?.profile_Image}
                          className={`${style.user_card_img} me-3`}
                          alt="method"
                        />
                        {item?.userID?.name}
                      </td>

                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "13rem",
                            overflowX: "scroll",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item?.message}
                        </div>
                      </td>

                      <td>
                        {item?.status?.[0] === "completed" ? (
                          <p style={{ color: "#01ff01" }}>
                            {item?.status?.[0]}
                          </p>
                        ) : item?.status?.[0] === "notcompleted" ? (
                          <p style={{ color: "red" }}>{item?.status?.[0]}</p>
                        ) : item?.status?.[0] === "inprogress" ? (
                          <p style={{ color: "yellow" }}>{item?.status?.[0]}</p>
                        ) : item?.status?.[0] === "pending" ? (
                          <p style={{ color: "yellow" }}>{item?.status?.[0]}</p>
                        ) : null}
                      </td>
                      <td>{item?.accepted[0]}</td>
                      <td> ${item?.amount}</td>
                      <td>
                        <button className={style.status_btn_paid}>
                          Send Payment
                        </button>{" "}
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
      </div>
    </div>
  );
};

export default ViewProposalModal;
