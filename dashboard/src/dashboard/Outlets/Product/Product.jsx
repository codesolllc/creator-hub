import styles from "./product.module.css";
import BoxSlider from "../../../components/BoxSlider/BoxSlider";
import { useEffect, useState } from "react";
import CategoryAddModal from "../../../components/CategoryAddModal/CategoryAddModal";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import axiosInstance from "../../../../axiosConfig";
import { useOutletContext } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BiTrash } from "react-icons/bi";
import DeleteAlert from "../../../components/DeleteAlert/DeleteAlert";
const Products = () => {
  const searchVal = useOutletContext();

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filterCatID, setFilterCatID] = useState("");
  const [typeCatFilter, setTypeCatFilter] = useState("");
  const [loader, setLoader] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productId, setProductId] = useState("");

  const handleRefresh = () => {
    setRefresher(!refresher);
  };
  const categoryViseFilter = (e) => {
    setFilterCatID(e.target.value);
  };
  const typeViseFilter = (e) => {
    setTypeCatFilter(e.target.value);
  };

  useEffect(() => {
    (async function getAllProduct() {
      setLoader(true);
      try {
        const res = await axiosInstance.get("/product/all_products");
        setLoader(false);
        setAllProducts(res?.data);
      } catch (error) {
        NotificationAlert(error.message, "warning");
        setLoader(false);
      }
    })();
    (async function getAllCat() {
      try {
        const res = await axiosInstance.get(
          "/product_categories/get_all_categories"
        );
        setAllCategories(res?.data?.categories);
      } catch (error) {
        NotificationAlert(error.message, "warning");
      }
    })();
  }, [refresher]);

  // Handle Pagination...
  const endOffset = itemOffset + 6;
  const pageCount = Math.ceil(allProducts?.length / 6);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % allProducts?.length;
    setItemOffset(newOffset);
  };

  // handle product delete
  const handleDeleteModal = (id) => {
    setProductId(id);
    setDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await axiosInstance.delete(
        `/product/delete_product/${productId}`
      );
      if (res.status === 200) {
        handleRefresh();
      }
    } catch (error) {
      console.log(error, "message");
      NotificationAlert("Failed To Delete! Try agian");
      setDeleteModal(false);
    }
  };

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
              <div>
                <select
                  name="lastdaysprogress"
                  onChange={categoryViseFilter}
                  className={styles.product_select}
                  defaultValue={"DEFAULT"}
                >
                  <option value={"DEFAULT"} disabled>
                    Filter By Category
                  </option>
                  <option value="">All</option>
                  {allCategories?.map((cat) => (
                    <option key={cat?._id} value={cat?._id}>
                      {cat?.category_name}
                    </option>
                  ))}
                </select>
                <select
                  name="lastdaysprogress"
                  onChange={typeViseFilter}
                  className={`${styles.product_select} ms-3`}
                  defaultValue={"DEFAULT"}
                >
                  <option value={"DEFAULT"} disabled>
                    Filter By Type
                  </option>
                  <option value="">All</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <h1 className={`${styles.product_title} text-center f-bolder`}>
            Product
          </h1>
          {!loader ? (
            allProducts &&
            allProducts
              ?.filter((item) => item?.product_category.includes(filterCatID))
              ?.filter((item) =>
                item?.type[0]
                  .toLowerCase()
                  .includes(typeCatFilter?.toLowerCase())
              )
              ?.filter((item) =>
                item?.product_name
                  .toLowerCase()
                  .includes(searchVal?.toLowerCase())
              )
              ?.slice(itemOffset, endOffset)
              ?.map((data) => (
                <div key={data?._id} className="col-lg-4 col-sm-6 mt-4 p-5">
                  <div className={`${styles.product_cartbox} card`}>
                    <span className={`${styles.edit_product_btn}`}>
                      <BiTrash
                        className={`${styles.edit_product_btn_icon}`}
                        onClick={() => handleDeleteModal(data?._id)}
                      />
                    </span>
                    <img
                      src={`${data?.featured_image}`}
                      className="card-img-top"
                      alt="prd_img"
                    />
                    <div className="card-body">
                      <div>
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">{data?.product_name}</span>
                          <span className="fw-bold">${data?.price}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                          <div>
                            <span className="fw-bold">status:</span>
                            <span> {data?.status[0]}</span>
                          </div>
                          <span className={styles.cart_button}>
                            {data?.type[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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

      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

      {addCategoryModal && (
        <CategoryAddModal
          setShowModal={setAddCategoryModal}
          refresher={handleRefresh}
        />
      )}
      {deleteModal && (
        <DeleteAlert
          setDeletePopup={setDeleteModal}
          deleteFun={handleDeleteProduct}
        />
      )}
    </>
  );
};

export default Products;
