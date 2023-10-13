import styles from "./Gigs.module.css";
import card_img from "../../../assets/dashboard/master.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosConfig";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import Loader from "../../../components/Loader/Loader";
import { useOutletContext } from "react-router-dom";
import ViewGigModal from "../../../components/ViewGigModal/ViewGigModal";

const Gigs = () => {
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
        const res = await axiosInstance.get("/gig/allgigs");
        if (res.status === 200) {
          setAllGigs(res?.data);
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
              <th>Image</th>
              <th>Name</th>
              <th>Title</th>
              <th>Desc</th>
              <th>Price</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody className={`${styles.table_body}`}>
            {allGigs
              ?.filter((item) =>
                item.title.toLowerCase()?.includes(searchVal?.toLowerCase())
              )
              .map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item?.authorID?.profile_Image}
                      className={`${styles.user_card_img} me-3`}
                      alt="method"
                    />
                  </td>

                  <td> {item?.authorID?.name}</td>
                  <td> {`${item?.title.substring(0, 10)}...`}</td>

                  <td>{`${item?.description.substring(0, 10)}...`}</td>

                  <td>{item?.price}</td>
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
        <ViewGigModal
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

export default Gigs;
