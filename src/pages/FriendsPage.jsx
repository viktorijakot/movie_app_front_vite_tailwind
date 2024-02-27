import { useFormik } from "formik";
import * as Yup from "yup";
import SmartInput from "../components/UI/SmartInput";
import useGetApiData from "../hooks/useGetApiData";
import { URL_BASE } from "../components/helper";
import { useMemo, useState } from "react";
import { useAuthContext } from "../store/AuthCtxProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function FriendsPage() {
  const [usersList, setUsersList] = useGetApiData(`${URL_BASE}users`);
  const [followingList, setFollowingList] = useGetApiData(
    `${URL_BASE}relations/myfollows`
  );
  const [followersList, setFollowersList] = useGetApiData(
    `${URL_BASE}relations/myfollowers`
  );
  const [filterValue, setFilterValue] = useState("");
  const { userId, token } = useAuthContext();
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
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

  const handleFollow = (follows, userName, email) => {
    const data = {
      follows,
      userName,
    };

    axios
      .post(`${URL_BASE}relations`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(response?.data.msg || `You are following ${follows}`);
        setFollowingList((currentFollowList) => [
          { id: follows, email, userName },
          ...currentFollowList,
        ]);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const handleUnfollow = (userId, userName) => {
    axios
      .delete(`${URL_BASE}relations/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(`${userName} is successfully unfollowed!`);
        setFollowingList((currentFollowList) =>
          currentFollowList.filter(
            (currentFollowObj) => currentFollowObj.id !== userId
          )
        );
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container min-h-screen flex justify-center">
      <div className="w-full mt-28 mb-10">
        <div>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none  focus:ring-teal-600 focus:border-teal-600 max-[425px]:text-xs"
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
                {user.id ===
                followingList.find((follow) => follow.id === user.id)?.id ? (
                  <button
                    onClick={() => handleUnfollow(user.id, user.userName)}
                    className="button  px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleFollow(user.id, user.userName, user.email)
                    }
                    className="button px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Follow
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <h1
          onClick={() => setShowFollowing(!showFollowing)}
          className={
            !showFollowing
              ? "text-2xl font-bold mt-10 text-[#f4d35e] cursor-pointer hover:underline"
              : "text-2xl font-bold mt-10 text-white cursor-pointer underline"
          }
        >
          Following{" "}
          {!showFollowing ? <span>({followingList.length})</span> : ":"}
        </h1>
        <ul>
          {showFollowing &&
            followingList?.map((followObj) => (
              <li
                key={followObj.id}
                className="flex justify-between items-center border border-white rounded px-2 mt-2 shadow-md"
              >
                <div>
                  <p>{followObj.userName}</p>
                  <p>{followObj.email}</p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      handleUnfollow(followObj.id, followObj.userName)
                    }
                    className="button  px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Unfollow
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <h1
          onClick={() => setShowFollowers(!showFollowers)}
          className={
            !showFollowers
              ? "text-2xl font-bold mt-10 text-[#f4d35e] cursor-pointer hover:underline"
              : "text-2xl font-bold mt-10 text-white cursor-pointer underline"
          }
        >
          Followers{" "}
          {!showFollowers ? <span>({followersList.length})</span> : ":"}
        </h1>
        <ul>
          {showFollowers &&
            followersList?.map((followerObj) => (
              <li
                key={followerObj.id}
                className="flex justify-between items-center border border-white rounded px-2 mt-2 shadow-md"
              >
                <div>
                  <p>{followerObj.userName}</p>
                  <p>{followerObj.email}</p>
                </div>
                <div>
                  {followerObj.id ===
                  followingList.find((follow) => follow.id === followerObj.id)
                    ?.id ? (
                    <button
                      onClick={() =>
                        handleUnfollow(followerObj.id, followerObj.userName)
                      }
                      className="button  px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleFollow(
                          followerObj.id,
                          followerObj.userName,
                          followerObj.email
                        )
                      }
                      className="button px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Follow
                    </button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendsPage;
