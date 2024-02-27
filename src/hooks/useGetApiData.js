import { useEffect, useState } from "react";
import { useAuthContext } from "../store/AuthCtxProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function useGetApiData(apiUrl, initValue = [], redirectUrl = '') {
    const [dataArr, setDataArr] = useState(initValue);
    const [apiErr, setApiErr] = useState({});
    const {token} = useAuthContext()
    const navigate = useNavigate();

    let configs = {};
    if (token !== '') {
        configs = {
            headers: {'Authorization': `Bearer ${token}`}
        }
    }

   useEffect(() => {
    axios
      .get(apiUrl, configs)
      .then((response) => {
        console.log('response ===', response);
        const commFromAPI = response.data;
        setDataArr(commFromAPI);
      })
      .catch((error) => {
        console.log('useApiData errro ===', error);
        setApiErr(error);
        if (redirectUrl) {
          navigate(redirectUrl);
      }
      toast.error(error.response.data.error);
      });
  }, [apiUrl]);

  return [dataArr, setDataArr, apiErr];
}
