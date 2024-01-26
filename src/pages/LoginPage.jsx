import { useFormik } from "formik";
import * as Yup from "yup";
import SmartInput from "../components/UI/SmartInput";
import { useAuthContext } from "../store/AuthCtxProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { URL_BASE } from "../components/helper";

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

      sendAxiosData(values);
    },
  });

  function sendAxiosData(data) {
    axios
      .post(`${URL_BASE}/auth/login`, data)
      .then((resp) => {
        console.log("resp", resp);
        toast.success("Welcome");
        login(data.email, resp.data.token, resp.data.userName);
        // navigate("/shop", { replace: true });
      })
      .catch((error) => {
        console.warn(error);

        const klaida = error.response.data.error;
        toast.error(klaida);
      });
  }

  return (
    <div className="container mx-auto pt-24">
      <h1 className="text-3xl">LoginPage</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
        voluptatibus, praesentium libero repellat officiis corporis esse iste
        totam reiciendis voluptatem!
      </p>
      <form onSubmit={formik.handleSubmit} className="mt-4" noValidate>
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
