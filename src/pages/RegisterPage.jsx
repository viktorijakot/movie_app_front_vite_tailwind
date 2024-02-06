import { useFormik } from "formik";
import SmartInput from "../components/UI/SmartInput";
import * as Yup from "yup";
import axios from "axios";
import { URL_BASE } from "../components/helper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      user_name: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).required(),
      user_name: Yup.string().min(3).required(),
      password: Yup.string().min(5).max(30).required(),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      sendAxiosData({
        email: values.email,
        password: values.password,
        userName: values.user_name,
      });
    },
  });

  function sendAxiosData(data) {
    axios
      .post(`${URL_BASE}/auth/register`, data)
      .then((resp) => {
        console.log("resp", resp);
        toast.success("You have been registered");
        navigate("/login");
      })
      .catch((error) => {
        console.log("register error ===", error);
        const klaida = error.response.data.error;
        toast.error(klaida);
      });
  }

  return (
    <div className="container mx-auto mt-32 mb-24 lg:w-1/2 xl:w-1/2 modal_box px-4 md:px-16">
      <h1 className="text-3xl mb-10">
        Sign <span className="in">up</span>
      </h1>
      <form onSubmit={formik.handleSubmit} className="mt-4 mb-2" noValidate>
        <div className="mb-4">
          <SmartInput id="email" formik={formik} type="email" />
        </div>
        <div className="mb-4">
          <SmartInput id="user_name" formik={formik} type="text" />
        </div>
        <div className="mb-4">
          <SmartInput id="password" formik={formik} type="password" />
        </div>
        <div className="mb-4">
          <SmartInput id="confirm_password" formik={formik} type="password" />
        </div>
        <button
          className="button py-2 px-4 mt-8 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
