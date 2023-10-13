import ProductCart from "../../../components/CategoryCart/CategoryCart";
import styles from "./product.module.css";
import { BiPlus } from "react-icons/bi";
import BoxSlider from "../../../components/BoxSlider/BoxSlider";
import { useEffect, useState } from "react";
import CategoryAddModal from "../../../components/CategoryAddModal/CategoryAddModal";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import axiosInstance from "../../../../axiosConfig";
import { useOutletContext } from "react-router-dom";

const Category = () => {
  const searchVal = useOutletContext();

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresher, setRefresher] = useState(false);

  const handleRefresh = () => {
    setRefresher(!refresher);
  };

  useEffect(() => {
    (async function getAllCat() {
      setLoader(true);
      try {
        const res = await axiosInstance.get(
          "/product_categories/get_all_categories"
        );
        setLoader(false);
        setAllCategories(res?.data?.categories);
      } catch (error) {
        NotificationAlert(error.message, "warning");
        setLoader(false);
      }
    })();
  }, [refresher]);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <BoxSlider />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center pe-3">
              <p
                className={`${styles.product_content} text-lg-start text-center f-bold`}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aperiam, officia. <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                nisi.
              </p>

              <h4 className={`f-bold ${styles.add_btn_heading}`}>
                <span
                  className={styles.add_btn}
                  onClick={() => setAddCategoryModal(true)}
                >
                  <BiPlus className={styles.plus_sambol} />
                </span>{" "}
                ADD NEW CATEGORY
              </h4>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <h1 className={`${styles.product_title} text-center f-bolder`}>
            Product Categories
          </h1>
          {!loader ? (
            allCategories &&
            allCategories
              ?.filter((item) =>
                item?.category_name
                  .toLowerCase()
                  .includes(searchVal?.toLowerCase())
              )
              ?.map((data) => (
                <div key={data?._id} className="col-lg-4 col-sm-6 mt-4 p-5">
                  <ProductCart data={data} refresher={handleRefresh} />
                </div>
              ))
          ) : (
            <div
              className="spinner-border text-success mx-auto mt-5"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          )}
        </div>
      </div>

      {addCategoryModal && (
        <CategoryAddModal
          setShowModal={setAddCategoryModal}
          refresher={handleRefresh}
        />
      )}
    </>
  );
};

export default Category;
