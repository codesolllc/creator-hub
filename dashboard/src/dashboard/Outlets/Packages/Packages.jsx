import styles from "./packages.module.css";
import PackageCart from "../../../components/PackageCart/PackageCart";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import PackageModal from "../../../components/PackageModal/PackageModal";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import axiosInstance from "../../../../axiosConfig";
import { useOutletContext } from "react-router-dom";


const Packages = () => {
  const searchVal = useOutletContext();
  const [packageModal, setPackageModal] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const res = await axiosInstance.get("/listCatWithPrd");
        if (res.data.status) {
          setPackages(res?.data?.data);
          console.log(res.data.data, "xxxx 2");
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error.message, "warning");
      }
    })();
  }, [packageModal]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <p className={`${styles.packages_content}  f-bold`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
              officia.
            </p>
            <h4 className={`f-bold ${styles.add_btn_heading} mt-5`}>
              <span
                className={styles.add_btn}
                onClick={() => setPackageModal(true)}
              >
                <BiPlus className={styles.plus_sambol} />
              </span>{" "}
              CREATE NEW PACKAGE
            </h4>
          </div>
        </div>
        <div className="row mt-4">
          {packages &&
            packages
              ?.filter((item) =>
                item?.category_name
                  .toLowerCase()
                  .includes(searchVal?.toLowerCase())
              )
              ?.map((item) => (
                <div key={item?.id} className="col-lg-6 mt-4">
                  <PackageCart data={item} />
                </div>
              ))}
        </div>
      </div>

      {packageModal && <PackageModal setShowModal={setPackageModal} />}
    </>
  );
};

export default Packages;
