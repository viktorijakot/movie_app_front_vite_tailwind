import axios from "axios";
import { URL_BASE } from "../components/helper";
import toast from "react-hot-toast";
import { useAuthContext } from "../store/AuthCtxProvider";
import { useEffect } from "react";

function useSendApiData(data = {}, urlEnd, message) {
  const { login } = useAuthContext();
  useEffect(()=> {
    axios
    .post(`${URL_BASE}/auth/${urlEnd}`, data)
    .then((resp) => {
      console.log("resp", resp);
      toast.success(message);
      login(data.email, resp.data.token, resp.data.userName);
      // navigate("/shop", { replace: true });
    })
    .catch((error) => {
      console.warn(error);

      const klaida = error.response.data.error;
      toast.error(klaida);
    });
  }, [urlEnd, data, login, message])
 
}

export default useSendApiData
