import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminHome from "./AdminHome";
import StaffNav from "./StaffNav";
import axios from "axios";
import CustomerList from "./CustomerList";
import UploadProducts from "./UploadProducts";
import AdminProfile from "./AdminProfile";
import About from "./About";
import Footage from "./Footage";
import { baseUrl } from "./URL";
function Staff() {
  const getHomeURI = `${baseUrl}/admin/home`;
  const customerURI = `${baseUrl}/admin/customers`;
  const navigate = useNavigate();
  const [staff, setstaff] = useState([]);
  const [products, setproducts] = useState("");
  const [firstname, setfirstname] = useState("");
  const [username, setusername] = useState("");
  const [profilePhoto, setprofilePhoto] = useState("");
  const [adminDetail, setadminDetail] = useState("");
  useEffect(() => {
    authorizeUser();
  }, []);
  const authorizeUser = () => {
    const admintoken = JSON.parse(localStorage.getItem("admintoken"));
    axios
      .get(getHomeURI, {
        headers: {
          Authorization: `Bearer ${admintoken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        const responseFromServer = res.data.thisadmin;
        setadminDetail(() => {
          return res.data.thisadmin;
        });
        if (res.data.status) {
          const adminInfo = {
            adminId: responseFromServer._id,
            email: responseFromServer.email,
            firstname: responseFromServer.firstname,
            lastname: responseFromServer.lastname,
          };
          localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
          setfirstname(() => {
            return responseFromServer.firstname;
          });
          setusername(() => {
            return responseFromServer.username;
          });
          setprofilePhoto(() => {
            return responseFromServer.profilePhoto;
          });
          axios.get(customerURI).then((res) => {
            if (res.data.status) {
              setstaff(() => {
                return res.data.admins;
              });
              setproducts(() => {
                return res.data.products;
              });
            } else {
              setstaff(0);
              setproducts(0);
            }
          });
        } else {
          localStorage.removeItem("admintoken");
          localStorage.removeItem("adminInfo");
          navigate("/staff_login");
        }
      });
  };

  return (
    <>
      <StaffNav firstname = {firstname} profilePhoto={profilePhoto} adminDetail={adminDetail}/>
      <Routes>
        <Route
          path="/"
          element={<AdminHome staff={staff} products={products} />}
        />
        <Route
          path="/addProduct"
          element={<UploadProducts adminDetail={adminDetail} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/:_id"
          element={<AdminProfile adminDetail={adminDetail} />}
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footage />
    </>
  );
}

export default Staff;
