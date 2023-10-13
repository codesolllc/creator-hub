import styles from "./usersummary.module.css"
import { IoMaleOutline } from "react-icons/io5";

const UserSummaryItem = () => {
  return (
    <div  className={`${styles.usersummary_item} d-flex justify-content-between py-2 mb-2 me-4`}>
    <div className="d-flex">
      <span>
        <IoMaleOutline className={styles.gender_icon} />
      </span>
      <div className={`${styles.userdetails} d-flex flex-column`}>
        <span className="f-bold">John Dow</span>
        <small>Aug 10, 2023</small>
      </div>
    </div>
    <div>
    <div className={`${styles.userdetails} d-flex flex-column`}>
        <span className="f-bold">John@gmail.com</span>
        <small>Jogndow</small>
      </div>
    </div>
  </div>
  )
}

export default UserSummaryItem
