import styles from "./users.module.css";
import avatar from "../../../assets/dashboard/user_profile.png";
import axiosInstance from "../../../../axiosConfig";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import { useOutletContext } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import DeleteAlert from "../../../components/DeleteAlert/DeleteAlert";

const Users = () => {
  const [IsUser, setIsUser] = useState();
  const [filterRole, setFilterRole] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [DeleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [userID, setUserID] = useState();

  console.log(userID);

  const handleDeleteUser = async () => {
    if (userID !== undefined) {
      try {
        setDeleteLoading(true);
        const res = await axiosInstance.delete(`/auth/delete-user/${userID}`);
        if (res.status === 200) {
          NotificationAlert("User deleted successfully", "success");
          setDeleteLoading(false);
        }
      } catch (error) {
        NotificationAlert(error.message, "warning");
        setDeleteLoading(false);
      }
    }
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
  }, []);

  const searchVal = useOutletContext();

  return (
    <>
      <div className="container py-5">
        <div className="text-end">
          <select
            className={styles.filter_select}
            onChange={(e) => setFilterRole(e.target.value)}
            value={filterRole}
          >
            <option value="all">All</option>
            <option value="creator">Creator</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className={`${styles.table_wrapper}`}>
          <table className={`${styles.table_container}`}>
            <thead className={`${styles.table_header}`}>
              <tr>
                <th>Name</th>
                <th>Register</th>
                <th>Email</th>
                <th>State</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className={`${styles.table_body}`}>
              {IsUser?.filter(
                (item) =>
                  item?.name
                    ?.toLowerCase()
                    ?.includes(searchVal?.toLowerCase()) &&
                  (filterRole === "all" || item.usertype === filterRole)
              )?.map((item) => (
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
                  <td className="text-center">
                    <span className="f-bolder">
                      <BiSolidTrashAlt
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setUserID(item?._id);
                          setIsDeleteUser(true);
                        }}
                      />
                    </span>
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
      {isDeleteUser && (
        <DeleteAlert
          deleteFun={handleDeleteUser}
          setDeletePopup={setIsDeleteUser}
        />
      )}
    </>
  );
};

export default Users;
