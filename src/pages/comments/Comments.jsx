import React, { useState } from "react";
import useGetApiData from "../../hooks/useGetApiData";
import { URL_BASE, baseBackendUrl } from "../../components/helper";
import userSvg from "../../assets/userSvg.svg";
import { useAuthContext } from "../../store/AuthCtxProvider";

function Comments({ commentsList = [], onDelete }) {
  const [show, setShow] = useState(false);
  const { userId } = useAuthContext();

  return (
    <div>
      <ul className="py-2 border border-white rounded px-2 mt-10 shadow-md divide-y  divide-[#f4d35e] bg-white">
        <h1
          onClick={() => setShow(!show)}
          className={
            !show
              ? "text-2xl font-bold  text-[#f4d35e] cursor-pointer hover:underline"
              : "text-2xl font-bold   text-[#f4d35e] mb-2 cursor-pointer underline"
          }
        >
          Comments {!show ? <span>({commentsList.length})</span> : ":"}
        </h1>
        {show &&
          commentsList?.map((commentObj) => (
            <li key={commentObj.id} className="pt-3 pb-3">
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-5">
                  {commentObj.img_url ? (
                    <img
                      className="border border-white object-cover  w-10 h-10 rounded-full"
                      src={
                        baseBackendUrl +
                        (commentObj.img_url !== ""
                          ? commentObj.img_url
                          : "placeholder.webp")
                      }
                      alt="profile picture"
                    />
                  ) : (
                    <img className="userSvg py-2 " src={userSvg} alt="user" />
                  )}
                  <div>
                    <p>{commentObj.userName}</p>
                    <p className="text-xs">{commentObj.email}</p>
                  </div>
                </div>
                <div>
                  {userId === commentObj.user_id && (
                    <button
                      onClick={() => onDelete(commentObj.id)}
                      className="button  px-4 py-2  rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className="mt-3 text-xs">
                  {new Date(commentObj.created_at).toLocaleString("lt", "long")}
                </p>
                <p className="font-bold mt-3">{commentObj.comment}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Comments;
