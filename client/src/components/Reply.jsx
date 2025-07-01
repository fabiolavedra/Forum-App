import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const Reply = ({ reply, setPosts, post, posts }) => {
  const { loggedUser } = useContext(UserContext);

  const deleteReply = () => {
    axios
      .delete(
        import.meta.env.VITE_API_URL +
          `/api/posts/${post._id}/reply/${reply._id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const newUpdatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            const newReplies = p.replies.filter((r) => r._id !== reply._id);
            return { ...p, replies: newReplies };
          }

          return post;
        });
        setPosts(newUpdatedPosts);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        key={reply.id}
        className="bg-white rounded-lg border border-gray-200 p-4 mb-4"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {reply.user.firstName[0]}
                {reply.user.lastName[0]}
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">
                {reply.user.firstName} {reply.user.lastName}
              </div>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(reply.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <h3 className="text-sm font-semibold text-gray-900  text-left">
            {reply.content}
          </h3>
          {(reply.user._id === loggedUser._id ||
            loggedUser.role === "admin") && (
            <Trash2
              className="w-5 h-5 cursor-pointer  text-gray-400"
              onClick={() => deleteReply()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Reply;
