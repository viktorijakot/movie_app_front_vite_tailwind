import { useFormik } from "formik";
import * as Yup from "yup";
import SmartInput from "../components/UI/SmartInput";
import { useAuthContext } from "../store/AuthCtxProvider";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { URL_BASE } from "../components/helper";
import sendApiData from "../hooks/sendApiData";
import useSendApiData from "../hooks/sendApiData";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).required(),
      password: Yup.string().min(5).max(30).required(),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);

      sendAxiosData(values, "login", "Welcome");
    },
  });

  function sendAxiosData(data) {
    axios
      .post(`${URL_BASE}/auth/login`, data)
      .then((resp) => {
        console.log("resp", resp);
        toast.success("Welcome");
        login(data.email, resp.data.token, resp.data.userName);
        navigate("/movie-list", { replace: true });
      })
      .catch((error) => {
        console.warn(error);

        const errorAxios = error.response.data.error;
        toast.error(errorAxios);
      });
  }

  return (
    <div className="container min-h-screen flex justify-center items-center">
      <div className="lg:w-1/2 xl:w-1/2 modal_box px-4 md:px-16">
        <h1 className="text-3xl mb-10">
          Log <span className="in">in</span>
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-4 mb-2" noValidate>
          <div className="mb-4">
            <SmartInput
              id="email"
              formik={formik}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <SmartInput
              id="password"
              formik={formik}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="button py-2 px-4 mt-8 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
