import useGetApiData from "../hooks/useGetApiData";
import { URL_BASE } from "../components/helper";
import { useMemo, useState } from "react";
import { useAuthContext } from "../store/AuthCtxProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { baseBackendUrl } from "../components/helper";
import userSvg from "./../assets/userSvg.svg";

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

  const handleFollow = (follows, userName, email, img_url) => {
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
          { id: follows, email, userName, img_url },
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
              <div className="flex items-center gap-5">
                {user.img_url ? (
                  <img
                    className="border border-white  w-10 h-10 object-cover rounded-full"
                    src={
                      baseBackendUrl +
                      (user.img_url !== "" ? user.img_url : "placeholder.webp")
                    }
                    alt="profile picture"
                  />
                ) : (
                  <img className="userSvg py-2 " src={userSvg} alt="user" />
                )}
                <div>
                  <p>
                    {user.userName} <span></span>
                  </p>
                  <p className="text-xs">{user.email}</p>
                </div>
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
                      handleFollow(
                        user.id,
                        user.userName,
                        user.email,
                        user.img_url
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
                {console.log("followObj ===", followObj)}
                <div className="flex items-center gap-5">
                  {followObj.img_url ? (
                    <img
                      className="border border-white object-cover  w-10 h-10 rounded-full"
                      src={
                        baseBackendUrl +
                        (followObj.img_url !== ""
                          ? followObj.img_url
                          : "placeholder.webp")
                      }
                      alt="profile picture"
                    />
                  ) : (
                    <img className="userSvg py-2 " src={userSvg} alt="user" />
                  )}
                  <div>
                    <p>{followObj.userName}</p>
                    <p className="text-xs">{followObj.email}</p>
                  </div>
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
                <div className="flex items-center gap-5">
                  {followerObj.img_url ? (
                    <img
                      className="border border-white object-cover  w-10 h-10 rounded-full"
                      src={
                        baseBackendUrl +
                        (followerObj.img_url !== ""
                          ? followerObj.img_url
                          : "placeholder.webp")
                      }
                      alt="profile picture"
                    />
                  ) : (
                    <img className="userSvg py-2 " src={userSvg} alt="user" />
                  )}
                  <div>
                    <p>{followerObj.userName}</p>
                    <p className="text-xs">{followerObj.email}</p>
                  </div>
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
