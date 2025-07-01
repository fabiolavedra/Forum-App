import {
  Home,
  Calendar,
  Users,
  Settings,
  Search,
  MessageCircle,
  Bell,
  User,
  Heart,
  TrendingUp,
  Eye,
  MessageSquare,
  ThumbsUp,
  ArrowRight,
  Play,
  Trash2,
  Edit,
  Edit2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useContext, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import Replies from "./Replies";
import favourite from "../assets/Heart1.png";
import love from "../assets/Like1.png";
import PostCreation from "./PostCreation";

const Post = ({ post, posts, setPosts }) => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const isLiked = post.likes.includes(loggedUser._id);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(post.content);

  const likePost = () => {
    if (!isLiked) {
      axios
        .post(
          import.meta.env.VITE_API_URL + `/api/posts/${post._id}/like`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          const newPosts = posts.map((post) => {
            if (post._id === res.data._id) {
              return res.data;
            }

            return post;
          });
          setPosts(newPosts);
          console.log(res);
        });
    } else {
      axios
        .post(
          import.meta.env.VITE_API_URL + `/api/posts/${post._id}/unlike`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          const newPosts = posts.map((post) => {
            if (post._id === res.data._id) {
              return res.data;
            }

            return post;
          });
          setPosts(newPosts);
          console.log(res);
        });
    }
  };

  const deletePost = () => {
    axios
      .delete(import.meta.env.VITE_API_URL + `/api/posts/${post._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const newUpdatedPosts = posts.filter((p) => {
          return post._id !== p._id;
        });
        setPosts(newUpdatedPosts);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isFavourite = loggedUser?.favouritePosts?.includes(post._id);

  const handleClick = () => {
    if (isFavourite) {
      axios
        .post(
          import.meta.env.VITE_API_URL + "/api/users/unfavourite/" + post._id,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          setLoggedUser(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      axios
        .post(
          import.meta.env.VITE_API_URL,
          "/api/users/favourite/" + post._id,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          setLoggedUser(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/posts/" + post._id,
        {
          content,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setEditMode(false);
        const modifiedPosts = posts.map((p) => {
          if (post._id === p._id) {
            return res.data;
          }
          return p;
        });
        setPosts(modifiedPosts);
      });
  };

  return (
    <div
      key={post.id}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {(
                post.createdBy.firstName[0] + post.createdBy.lastName[0]
              ).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {post.createdBy.firstName} {post.createdBy.lastName}
            </div>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
        <img
          src={isFavourite ? favourite : love}
          className="cursor-pointer"
          onClick={handleClick}
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-6 text-left">
        {editMode ? (
          <form onSubmit={handleEdit}>
            <div className="flex items-center space-x-3">
              <input
                className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Let's share what going on your mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600">
                Edit Post
              </button>
            </div>
          </form>
        ) : (
          post.content
        )}
      </h3>

      <div className="mb-4">
        {post.image && (
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">UI Design Preview</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <div className="flex space-between space-x-3">
            <div className="flex items-center space-x-1">
              <ThumbsUp
                className={`w-4 cursor-pointer h-4 ${
                  isLiked ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  likePost();
                }}
              />
              <span>{post.likes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare
                className="w-4 h-4 cursor-pointer"
                onClick={() => setRepliesOpen(!repliesOpen)}
              />
              <span>{post.replies.length}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {post.createdBy._id === loggedUser._id && (
            <Edit2
              className="w-5 h-5 cursor-pointer text-gray-400"
              onClick={() => setEditMode(!editMode)}
            />
          )}
          {(post.createdBy._id === loggedUser._id ||
            loggedUser.role === "admin") && (
            <Trash2
              className="w-5 h-5 cursor-pointer text-gray-400"
              onClick={() => deletePost()}
            />
          )}
        </div>
      </div>
      {repliesOpen && <Replies post={post} posts={posts} setPosts={setPosts} />}
    </div>
  );
};

export default Post;
