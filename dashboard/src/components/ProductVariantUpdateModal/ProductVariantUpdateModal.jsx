import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";

const ProductVariantUpdateModal = ({ setShowModal, data }) => {
  const user = useSelector((state) => state.data);
  const token = useSelector((state) => state?.data?.data);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [productVariantField, setProductVariantField] = useState({
    prod_var_name: data?.prod_var_name,
    prod_id: "",
    cat_id: "",
    user_id: user?.additional?.id,
  });

  
  const handleProductVariantInputs = (e) => {
    setProductVariantField({
      ...productVariantField,
      [e.target.name]: e.target.value,
    });
  };

  const handleGalleryImageChange = (e) => {
    setGalleryImages(e.target.files);
  };

  const onSumbitProductVariant = async (e) => {
    e.preventDefault();
    if (
      productVariantField.prod_var_name &&
      productVariantField.user_id &&
      productVariantField?.cat_id
    ) {
      const formData = new FormData();
      formData.append("prod_var_name", productVariantField?.prod_var_name);
      formData.append("prod_id", productVariantField?.prod_id);
      formData.append("cat_id", productVariantField?.cat_id);
      formData.append("user_id", productVariantField?.user_id);
      for (const image of galleryImages) {
        formData.append("prd_imgs[]", JSON.stringify(image));
      }

      try {
        const res = await axiosInstance.post("/addprodvar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization": `Bearer ${token}`,
          },
        });
        console.log(res.data, "res data here!");
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

  useEffect(() => {
    // all category..
    (async function () {
      try {
        const res = await axiosInstance.get("/listCategory-user");
        if (res.status) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.log(error.message);
        NotificationAlert(error?.message, "warning");
      }
    })();
    // all products..
    (async function () {
      try {
        const res = await axiosInstance.get("/listProduct");
        if (res.status) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.log(error);
        NotificationAlert(error?.response.data.message, "warning");
      }
    })();
  }, []);

  return (
    <div className="modal_wrapper">
      <div className="modal_box">
        <div className="modal_head d-flex justify-content-center">
          <h2 className="f-bold">UPDATE PRODUCT VARIANT</h2>
          <span className="modal_close_btn" onClick={() => setShowModal(false)}>
            X
          </span>
        </div>
        <form className="mt-1 modal_form ">
          <input
            type="text"
            placeholder="Product Variant Name"
            className="form-control mb-3"
            name="prod_var_name"
            value={productVariantField.prod_var_name}
            onChange={handleProductVariantInputs}
          />

          <input
            type="file"
            accept="image/png,image/jpeg"
            placeholder="Product Image"
            name="prd_imgs[]"
            className="form-control mb-3"
            multiple
            onChange={handleGalleryImageChange}
          />

          <select
            name="cat_id"
            className="mb-3 mx-auto w-100"
            defaultValue={"DEFAULT"}
            onChange={handleProductVariantInputs}
          >
            <option value={"DEFAULT"} disabled>
              Select Category
            </option>
            <option value={"DEFAULT"} disabled>
              ---------------------
            </option>
            {categories &&
              categories?.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.category_name}
                </option>
              ))}
          </select>
          <br />
          <select
            name="prod_id"
            className="mb-3 mx-auto w-100"
            defaultValue={"DEFAULT"}
            onChange={handleProductVariantInputs}
          >
            <option value={"DEFAULT"} disabled>
              Select Product
            </option>
            <option value={"DEFAULT"} disabled>
              ---------------------
            </option>
            {products &&
              products?.map((product) => (
                <option key={product?.id} value={product?.id}>
                  {product?.prd_name}
                </option>
              ))}
          </select>

          <button className="modal_sumbit_btn" onClick={onSumbitProductVariant}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductVariantUpdateModal;
