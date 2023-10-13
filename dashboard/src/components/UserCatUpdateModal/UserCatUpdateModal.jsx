import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";

const UserCategoryUpdateModal = ({ setShowModal, data, refresher }) => {
  const [productField, setProductField] = useState({
    category_name: data?.user_category_name,
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
    console.log(productField.category_name, data?._id, "form data here");
    e.preventDefault();
    if (productField.category_name) {
      const formData = new FormData();
      formData.append("user_category_name", productField?.category_name);
      if (productField?.category_image !== "") {
        formData.append("category_image", productField?.category_image);
      }
      try {
        const res = await axiosInstance.patch(
          `/usercategories/update-usercategory/${data?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        NotificationAlert("Update Successfully", "success");
        refresher();
        setShowModal(false);
      } catch (error) {
        console.log(error, "update error");
        NotificationAlert("Failed to update category! try again", "warning");
      }
    } else {
      NotificationAlert("All Feilds Required!", "warning");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold">UPDATE CATEGORY</h2>
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCategoryUpdateModal;
