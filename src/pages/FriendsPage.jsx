import { useFormik } from "formik";
import * as Yup from "yup";
import SmartInput from "../components/UI/SmartInput";
import useGetApiData from "../hooks/useGetApiData";
import { URL_BASE } from "../components/helper";
import { useMemo, useState } from "react";
import { useAuthContext } from "../store/AuthCtxProvider";

function FriendsPage() {
  const [usersList, setUsersList] = useGetApiData(`${URL_BASE}users`);
  const [filterValue, setFilterValue] = useState("");
  const { userId } = useAuthContext();

  const filteredUsers = useMemo(() => {
    if (filterValue)
      return usersList.filter(
        (user) =>
          (user.email.toLowerCase().includes(filterValue.toLowerCase()) &&
            user.id !== userId) ||
          (user.userName.toLowerCase().includes(filterValue.toLowerCase()) &&
            user.id !== userId)
      );
  }, [usersList, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleFollow = (userId) => {
    console.log("userId) ===", userId);
  };

  return (
    <div className="container min-h-screen flex justify-center">
      <div className="w-full mt-28">
        <div>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none  focus:ring-teal-600 focus:border-teal-600"
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Find a friend by name or email"
          />
        </div>
        <ul className="divide-y  divide-[#f4d35e]">
          {filteredUsers?.map((user) => (
            <li key={user.id} className="flex justify-between items-center ">
              <div>
                <p>
                  {user.userName} <span>{user.email}</span>
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleFollow(user.id)}
                  className="button px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Follow
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2>Your friends</h2>
      </div>
    </div>
  );
}

export default FriendsPage;
