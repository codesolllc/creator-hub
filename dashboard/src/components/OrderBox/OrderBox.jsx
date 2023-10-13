import styles from "./orderbox.module.css";
import { AiOutlineRise } from "react-icons/ai";
const OrderBox = ({title, boxColor, imgSrc}) => {
  return (
    <div className={styles.Dbox} style={{backgroundColor: boxColor}}>
      <div className="d-flex justify-content-between">
          <h5>{title}</h5>
          <span>24.4% <AiOutlineRise/></span>
      </div>
      <div className="d-flex justify-content-between">
          <h2>3232</h2>
          <img src={imgSrc} className={styles.boxIcon} alt="ordericons" />
      </div>
     
    </div>
  );
};

export default OrderBox;
