import styles from "./proposal.module.css";
import card_img from "../../../assets/dashboard/master.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosConfig";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import Loader from "../../../components/Loader/Loader";
import { useOutletContext } from "react-router-dom";
import ViewGigModal from "../../../components/ViewGigModal/ViewGigModal";
import ViewProposalModal from "../../../components/ViewProposalModal/ViewProposalModal";

const Proposal = () => {
  const [allGigs, setAllGigs] = useState();
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
        const res = await axiosInstance.get("/hire/get_all_proposals");
        if (res.status === 200) {
          setAllGigs(res?.data?.allproposals);
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
              <th>Creator</th>
              <th>Desc</th>
              <th>Expected Price</th>
              <th>User</th>
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

                  <td>
                    <img
                      src={item?.CreatorID?.profile_Image}
                      className={`${styles.user_card_img} me-3`}
                      alt="method"
                    />
                    {item?.CreatorID?.name}
                  </td>

                  <td>{`${item?.work_detail?.substring(0, 10)}...`}</td>

                  <td>${item?.desired_amount}</td>
                  <td>
                    <button
                      className={styles.status_btn_paid}
                      onClick={() => handleGigId(item)}
                    >
                      View
                    </button>
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

export default Proposal;
