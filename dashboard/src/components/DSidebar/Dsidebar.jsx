import styles from "./dsidebar.module.css";
import { NavLink } from "react-router-dom";
import {
  FaImages,
  FaBoxOpen,
  FaUsers,
  FaUser,
  FaBoxes,
  FaHandHoldingHeart,
  FaRegChartBar,
  FaStickyNote,
} from "react-icons/fa";
import { PiContactlessPaymentFill, PiNotepadFill } from "react-icons/pi";
import { AiFillCheckCircle } from "react-icons/ai";
import dashboardLogo from "../../assets/dashboard/dashboard_logo.png";

const Dsidebar = ({ show, closeSidebar }) => {
  return (
    <>
      <aside className={show ? `${styles.sidebar}` : `${styles.hidesidebar}`}>
        <span className={styles.close_dashboard_btn} onClick={closeSidebar}>
          X
        </span>

        {/* logo*/}
        <figure className={`text-center py-5 ${styles.dashboard_logo}`}>
          <img src={dashboardLogo} alt="landplan" className="me-3" />
        </figure>

        {/* sidebar menu */}
        <div className={`${styles.sidbar_links}`}>
          <ul className="px-0">
            <li>
              <NavLink
                to="/dashboard/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaRegChartBar className="me-2" /> Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/recommended"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaHandHoldingHeart className="me-2" /> Recommended
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/verify"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <AiFillCheckCircle className="me-2" /> Verify User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/category"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaBoxes className="me-2" /> Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/usercategory"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaUsers className="me-2" /> User Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaBoxOpen className="me-2" /> Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaUser className="me-2" /> Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/post"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaImages className="me-2" /> Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/gigs"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <FaStickyNote className="me-2" /> Gigs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/proposal"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <PiNotepadFill className="me-2" /> Proposal
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <PiContactlessPaymentFill className="me-2" /> Payment
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/active-card-users"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.menu_item_active}`
                    : `${styles.menu_item}`
                }
              >
                <PiContactlessPaymentFill className="me-2" /> Active Card Users              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Dsidebar;
