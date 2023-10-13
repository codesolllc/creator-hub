import styles from "./Post.module.css";
import BoxSlider from "../../../components/BoxSlider/BoxSlider";
import { useEffect, useState } from "react";
import CategoryAddModal from "../../../components/CategoryAddModal/CategoryAddModal";
import { NotificationAlert } from "../../../components/NotificationAlert/NotificationAlert";
import axiosInstance from "../../../../axiosConfig";
import { useOutletContext } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BiTrash } from "react-icons/bi";
import DeleteAlert from "../../../components/DeleteAlert/DeleteAlert";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import noImg from "../../../assets/no-img.gif";

const Post = () => {
  const searchVal = useOutletContext();

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [postId, setpostId] = useState("");

  const handleRefresh = () => {
    setRefresher(!refresher);
  };
  useEffect(() => {
    (async function getAllProduct() {
      setLoader(true);
      try {
        const res = await axiosInstance.get("/post/all-posts");
        setLoader(false);
        setAllProducts(res?.data);
        console.log(res.data);
      } catch (error) {
        NotificationAlert(error.message, "warning");
        setLoader(false);
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
    setpostId(id);
    setDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await axiosInstance.delete(`/post/delete-posts/${postId}`);
      if (res.status === 200) {
        handleRefresh();
      }
    } catch (error) {
      console.log(error, "message");
      NotificationAlert("Failed To Delete! Try agian");
      setDeleteModal(false);
    }
  };

  console.log(allProducts, 'all post');


  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <h1 className={`${styles.product_title} text-center f-bolder`}>
            Posts
          </h1>
          {!loader ? (
            allProducts &&
            allProducts?.slice(itemOffset, endOffset)?.map((data) => (
              <div
                key={data?._id}
                className="col-lg-4 col-sm-6 mt-4 p-5 d-flex
                 justify-content-center
                align-items-end"
              >
              
                <div className={`${styles.product_cartbox} card`}>
                    {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                <div className={styles.card_head}>
                    <div>
                      
                      <div className="d-flex justify-content-between">
                        <div>
                          <span className=" pe-3">
                          <img
                        src={`${data?.authorID?.profile_Image}`}
                        alt="prd_img"
                         className={styles.user_avatar}
                      />
                          </span>
                          <span className="fw-bold">{data?.authorID?.name}</span>
                        </div>
                      </div>
                    </div>


                    <span className={`${styles.edit_product_btn}`}>
                    <BiTrash
                      className={`${styles.edit_product_btn_icon}`}
                      onClick={() => handleDeleteModal(data?._id)}
                    />
                  </span>
                  </div>
                {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
                 
                  {data?.image !== "" && data?.image ? (
                    <>
                      <img
                        src={`${data?.image}`}
                        className="card-img-top"
                        alt="prd_img"
                      />
                      <p
                        style={{
                          position: "relative",
                          top: "1rem",
                          left: "1rem",
                          margin: "0",
                        }}
                        className="fw-bold"
                      >
                        {`${data?.description.substring(0, 40)}...`}
                      </p>
                    </>
                  ) : data?.video && data?.video !== "" ? (
                    <div>
                      <Video
                        controls={[
                          "PlayPause",
                          "Seek",
                          "Time",
                          "Volume",
                          "Fullscreen",
                        ]}
                        style={{
                          height: "17rem",
                        }}
                      >
                        <source src={data?.video} type="video/mp4" />
                        <track
                          label="English"
                          kind="subtitles"
                          srcLang="en"
                          src={data?.video}
                          default
                        />
                      </Video>
                      <p
                        style={{
                          position: "relative",
                          top: "1rem",
                          left: "1rem",
                          margin: "0",
                        }}
                        className="fw-bold"
                      >
                        {`${data?.description.substring(0, 40)}...`}
                      </p>
                    </div>
                  ) : !data?.image && !data?.video ? (
                    <>
                      <img src={noImg} className="card-img-top" alt="prd_img" />
                      <p
                        style={{
                          position: "relative",
                          top: "1rem",
                          left: "1rem",
                          margin: "0",
                        }}
                        className="fw-bold"
                      >{`${data?.title.substring(0, 40)}...`}</p>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="card-body">
                    <div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{data?.product_name}</span>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          <span className=" pe-3">
                            Comments:({data.comments.length})
                          </span>
                          <span>Likes:({data.likes.length})</span>
                        </div>
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

export default Post;
