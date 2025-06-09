/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../config";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dataUserLogin, setDataUserLogin] = useState([]);

  useEffect(() => {
    getUser();
    if (user) {
      const fetchDataUser = async () => {
        try {
          const res = await axiosInstance.get(`/user/${user?._id}`);
          setDataUserLogin(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/user/refetch", {
        withCredentials: true,
      });
      // Patch: pastikan userId selalu ada di context user
      setUser({
        ...res.data.data,
        userId: res.data.data.userId || res.data.data._id,
      });
    } catch (err) {
      if (err) {
        console.log("tidak ada user, perlu Login!");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, dataUserLogin, setDataUserLogin }}
    >
      {children}
    </UserContext.Provider>
  );
}
