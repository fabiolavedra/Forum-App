import axios from "axios";
import { useState } from "react";
import Reply from "./Reply";

const Replies = ({ post, posts, setPosts }) => {
  const [reply, setReply] = useState("");
  const createReply = (e) => {
    e.preventDefault();
    axios
      .post(
        import.meta.env.VITE_API_URL + `/api/posts/${post._id}/reply`,
        { content: reply },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        const newUpdatedPosts = posts.map((post) => {
          if (post._id === res.data._id) {
            return res.data;
          }
          return post;
        });
        setPosts(newUpdatedPosts);
        setReply("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-200 rounded p-2 mt-6">
      <form onSubmit={createReply} className="bg-white rounded-lg ">
        <div className="flex items-center space-x-3">
          <input
            className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Reply..."
            onChange={(e) => setReply(e.target.value)}
            value={reply}
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600"
            type="submit"
          >
            Reply
          </button>
        </div>
      </form>
      <div>
        {post.replies.map((reply) => {
          return (
            <div>
              {" "}
              <Reply
                reply={reply}
                setPosts={setPosts}
                post={post}
                posts={posts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Replies;
