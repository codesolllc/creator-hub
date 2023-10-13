import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import styles from "./dashboardlayout.module.css";
import Dsidebar from "../../components/DSidebar/Dsidebar";
import searchicon from "../../assets/dashboard/search-icon.png";
import avatar from "../../assets/dashboard/user_profile.png";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = () => {
  const [searchVal, setSearchVal] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const admin = useSelector((state) => state?.data);
  const user = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#518432", height: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <Dsidebar show={showSidebar} closeSidebar={() => setShowSidebar(false)} />

      <div
        className={
          showSidebar ? styles.outlet_wrapper : styles.outlet_wrapper_full
        }
      >
        {/* Dashboard Header... */}
        <header
          className={`${styles.dashboard_header} d-flex justify-content-between`}
        >
          <div className="d-flex">
            {/* Menu bar */}
            <span onClick={() => setShowSidebar(true)}>
              <BsReverseListColumnsReverse
                className={showSidebar ? styles.menubar_hide : styles.menubar}
              />
            </span>
            {/* search */}
            <div className={styles.product_filtration_search}>
              <img alt="aa" src={searchicon} />
              <input
                type="text"
                value={searchVal}
                placeholder="Search..."
                onChange={(e) => setSearchVal(e.target.value)}
              />
            </div>
          </div>

          <div>
            <figure className="d-flex align-items-center h-100 px-sm-5 px-2 text-light">
              <figcaption className={`${styles.d_username} fw-bold`}>
              {admin?.findUser?.name}
              </figcaption>
              <img
                src={admin?.findUser?.profile_Image}
                className={styles.d_avatar}
                alt="user"
              />
              <IoLogOutOutline
                className="ms-3"
                style={{ fontSize: "30px", cursor: "pointer" }}
                title="logout"
                onClick={handleLogout}
              />
            </figure>
          </div>
        </header>

        {/* Inner Pages */}

        <Outlet context={searchVal} />
      </div>
    </div>
  );
};

export default DashboardLayout;
