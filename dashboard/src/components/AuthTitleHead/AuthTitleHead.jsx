import styles from "./authtitlehead.module.css";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const AuthTitleHead = ({ title }) => {
  return (
      <div className={`${styles.authbox_title_bar}`}>
        <Link to="/" className={styles.link_angle}>
          <AiOutlineLeft />
        </Link>
        <h1>{title}</h1>
      </div>
  );
};

export default AuthTitleHead;
