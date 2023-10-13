import React, { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import Loader from "../Loader/Loader";

const ReccomendBtn = ({ data, updater, recommendResponse }) => {
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    padding: "5px",
    backgroundColor: "#593bfb",
    borderRadius: "5px",
    color: "var(--white)",
    fontSize: "15px",
    outline: "none",
    border: "none",
    width: "auto",
    fontWeight: "600",
  };

  const handleRecomendation = async (recommend) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/auth/recomendation/${data?._id}`,
        {
          recomended: String(recommend),
        }
      );
      if (res.status === 200) {
        NotificationAlert("Creater Recommend Successfully", "success");
        updater(!recommendResponse);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      NotificationAlert(error.message, "warning");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : data?.recomended ? (
        <button
          style={style}
          onClick={() => {
            handleRecomendation(false);
          }}
        >
          Cancel
        </button>
      ) : (
        <button
          style={style}
          onClick={() => {
            handleRecomendation(true);
          }}
        >
          Recommend
        </button>
      )}
    </>
  );
};

export default ReccomendBtn;
