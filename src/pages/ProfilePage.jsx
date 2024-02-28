import { useFormik } from "formik";
import SmartInput from "../components/UI/SmartInput";
import * as Yup from "yup";
import { useState } from "react";
import { useAuthContext } from "../store/AuthCtxProvider";
import { useActionData, useNavigate } from "react-router-dom";
import { URL_BASE, baseBackendUrl } from "../components/helper";
import userSvg from "./../assets/userSvgProfile.svg";
import axios from "axios";
import toast from "react-hot-toast";

function ProfilePage() {
  const [itemImagePreview, setItemImagePreview] = useState("");

  const { token, userName, email, userId, login, logout, imgUrl } =
    useAuthContext();
  console.log("userName ===", email, userName, userId);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_name: userName || "",
      file: "",
    },
    validationSchema: Yup.object({
      user_name: Yup.string().min(3).required(),
      file: Yup.mixed().optional(),
    }),
    onSubmit: (values, actions) => {
      const data = {
        userName: values.user_name,
        file: values.file,
      };

      sendAxiosData(data);
      actions.resetForm();
    },
  });

  function sendAxiosData(data) {
    console.log("DATA === ", data);
    axios
      .put(`${URL_BASE}users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(
          response?.data.msg ||
            `${userName}, your profile was updated successfully!`
        );
        navigate("/profile", { replace: true });
        logout();
        login(email, response.data.token);
        formik.initialValues.file = "";
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (file) {
        formik.setFieldValue("file", file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setItemImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDeleteImage = () => {
    formik.setFieldValue("file", "");
    setItemImagePreview("");
  };
  return (
    <div className="container min-h-screen flex justify-center items-center">
      <div className="w-full modal_box mt-28 mb-20 px-4 lg:px-16 ">
        <h1 className="text-center mb-5 text-2xl font-bold">Edit profile</h1>
        <div className="flex justify-around items-center">
          <div>
            {imgUrl ? (
              <img
                className="border-4 border-white  w-80 h-80 rounded-full"
                src={
                  baseBackendUrl + (imgUrl !== "" ? imgUrl : "placeholder.webp")
                }
                alt="profile picture"
              />
            ) : (
              <img
                className="border-4 border-white py-2 w-80 h-80 rounded-full"
                src={userSvg}
                alt="user"
              />
            )}
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-4 mb-2" noValidate>
            <div className="mb-4">
              <SmartInput
                id={"email"}
                formik={formik}
                type="email"
                placeholder={email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <SmartInput id="user_name" formik={formik} type="text" />
            </div>
            {/* <div className="mb-4">
            <SmartInput id="password" formik={formik} type="password" />
          </div> */}
            {/* <div className="mb-4">
            <SmartInput id="confirm_password" formik={formik} type="password" />
          </div> */}
            <div className="mt-5">
              {formik.values["file"] && (
                <>
                  <p>Image Preview</p>
                  <div className="p-5 border rounded mb-5 flex flex-col justify-center items-center">
                    {console.log(
                      'formik.values["img_url"]  ===',
                      formik.values["file"]
                    )}
                    {console.log("itemImagePreview ===", itemImagePreview)}

                    <img
                      src={
                        formik.values["img_url"]
                          ? baseBackendUrl + formik.values["img_url"]
                          : itemImagePreview
                      }
                      alt="Profile Preview"
                      style={{ width: "200px" }}
                    />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="button profile text-white mt-2 py-2 px-4 rounded"
                    >
                      Delete Image
                    </button>
                  </div>
                </>
              )}
              <label htmlFor="file" className="w-full mt-5">
                <span className="block">File upload</span>
                <input
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-[#62c0a2] focus:border-[#62c0a2]"
                  accept="image/*"
                  id="file"
                />
              </label>
              {formik.touched["file"] && formik.errors["file"] && (
                <p className="text-red-500 ">{formik.errors["file"]}</p>
              )}
            </div>

            <button
              className="button py-2 px-4 mt-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
