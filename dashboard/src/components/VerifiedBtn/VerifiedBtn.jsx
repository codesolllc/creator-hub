import React, { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { NotificationAlert } from "../NotificationAlert/NotificationAlert";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VerifiedBtn = ({ data, updater, setUpdater }) => {
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


  const handleRecomendation = async (verify) => {
    try {
      const res = await axiosInstance.patch(
        `/api/${data?.userID?._id}/verification-handler/${data?._id}`,
        {
          verified: String(verify),
        }
      );
      if (res.status === 200) {
        NotificationAlert("Creater verified Successfully", "success");
        console.log(verify);
        setUpdater(!updater)
      }
    } catch (error) {
      console.log(error);
      NotificationAlert(error.message, "warning");
    }
  };

  useEffect(() => {}, [updater]);

  return (
    <>
      {data?.userID?.verified ? (
        <button
          style={style}
          onClick={() => {
            handleRecomendation(false);
          }}
        >
          Decline
        </button>
      ) : (
        <button
          style={style}
          onClick={() => {
            handleRecomendation(true);
          }}
        >
          Accept
        </button>
      )}
    </>
  );
};

export default VerifiedBtn;
