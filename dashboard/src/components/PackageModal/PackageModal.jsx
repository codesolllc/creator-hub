import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useSelector } from "react-redux";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";


const PackagesModal = ({ setShowModal }) => {
  const user = useSelector((state) => state.data);
  const token = useSelector((state) => state?.data?.data);
  const [categoryField, setCategoryField] = useState({
    category_name: "",
    price: "",
    period: "",
    user_id: user?.additional?.id,
  });


  const handleCategoryInputs = (e) => {
    setCategoryField({ ...categoryField, [e.target.name]: e.target.value });
  };

  const onSumbitCategory = async (e) => {
    e.preventDefault();
    console.log(categoryField, "xxx", token);
    if (
      categoryField.category_name &&
      categoryField.price &&
      categoryField.period &&
      categoryField.user_id
    ) {
      try {
        const res = await axiosInstance.post(
          "/addCategory",
          categoryField
          // {
          //   headers: {
          //     // "Authorization": `Bearer ${token}`,
          //   },
          // },
        );
        console.log(res, "res data here!");
        NotificationAlert(res?.data?.data, "success");
        setShowModal(false);
      } catch (error) {
        NotificationAlert(error?.response?.data?.message, "warning");
        console.log(error);
      }
    } else {
      NotificationAlert("All Feilds Required!", "warning");
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold">ADD NEW PACKAGES</h2>
          <span className="modal_close_btn" onClick={() => setShowModal(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form ">
          <input
            type="text"
            placeholder="Package Title"
            className="form-control mb-3"
            name="category_name"
            value={categoryField.category_name}
            onChange={handleCategoryInputs}
          />
          <input
            type="number"
            placeholder="Package Price"
            className="form-control mb-3"
            name="price"
            value={categoryField.price}
            onChange={handleCategoryInputs}
          />
          <select
            name="period"
            defaultValue={"default"}
            onChange={handleCategoryInputs}
          >
            <option value="default" disabled>
              {" "}
              Select Period
            </option>
            <option value="Year">Year</option>
            <option value="Monthly">Month</option>
          </select>

          <button className="modal_sumbit_btn mt-3" onClick={onSumbitCategory}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackagesModal;
