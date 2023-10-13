import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";

const UserCatAddModal = ({ setShowModal, refresher }) => {
  const [productField, setProductField] = useState({
    category_name: "",
    category_image: "",
  });

  // handle inputs
  const handleCategoryInputs = (e) => {
    setProductField({ ...productField, [e.target.name]: e.target.value });
  };

  const handleCatImg = (e) => {
    setProductField({ ...productField, ["category_image"]: e.target.files[0] });
  };

  // submit category
  const onSumbitCategory = async (e) => {
    e.preventDefault();
    if (productField.category_name && productField.category_image) {
      const formData = new FormData();
      formData.append("user_category_name", productField?.category_name);
      formData.append("category_image", productField?.category_image);

      try {
        const res = await axiosInstance.post(
          "/usercategories/create_user_category",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        NotificationAlert(res?.data?.message, "success");
        setShowModal(false);
        refresher();
      } catch (error) {
        NotificationAlert("Failed to upload category! try again", "warning");
      }
    } else {
      NotificationAlert("All Feilds Required!", "warning");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold">USER CATEGORY</h2>
          <span className="modal_close_btn" onClick={() => setShowModal(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form ">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Category Name"
            name="category_name"
            value={productField.category_name}
            onChange={handleCategoryInputs}
          />
          <input
            type="file"
            accept="image/png,image/jpeg"
            placeholder="category Image"
            className="form-control mb-3"
            name="category_image"
            onChange={handleCatImg}
          />

          <button className="modal_sumbit_btn mt-3" onClick={onSumbitCategory}>
            Save New User Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCatAddModal;
