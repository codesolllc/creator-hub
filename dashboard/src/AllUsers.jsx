import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useSelector } from "react-redux";
const AllUsers = () => {
  const token = useSelector((state) => state?.data?.data);
  const [users, setUsers] = useState();

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("/listUsers", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res?.data?.status) {
        console.log(res?.data?.data);
        setUsers(res?.data?.data);
      }
      console.log(res?.data, "xxxxxx");
    } catch (error) {
      console.log(error, "xxxxxx");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-5">
      <h1>Users</h1>
      {users &&
        users?.map((data, i) => (
          <p key={i}>
            {i + 1}. {data?.email}
          </p>
        ))}
    </div>
  );
};

export default AllUsers;
