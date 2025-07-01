import { useEffect, useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import UserContext from "../components/UserContext";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import { MoveLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [favouritePosts, setFavouritePosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("posts");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setLoggedUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(import.meta.env.VITE_API_URL + "/api/posts/me", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMyPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/favourites", {
        withCredentials: true,
      })
      .then((res) => {
        setFavouritePosts(res.data.favouritePosts);
      });
  }, [loggedUser]);

  return (
    <UserContext value={{ loggedUser, setLoggedUser }}>
      <div className="grid grid-cols-12 gap-6 mx-auto">
        <Header redirect="/fyp" />
        <NavLink
          to="/fyp"
          className="col-span-2 pl-8 flex gap-2 text-gray-500 hover:underline hover:text-blue-600"
        >
          <MoveLeft /> <aside className="h-fit">Go back</aside>
        </NavLink>
        <main className="col-span-8 col-start-3">
          <UserInfo postNumber={myPosts.length} />
          <div class="bg-white rounded-xl p-2 mb-6 shadow-sm">
            <div class="flex">
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all focus:outline-none hover:outline-none ${
                  selectedTab === "posts"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-50"
                } `}
                onClick={() => setSelectedTab("posts")}
              >
                <span>📝</span>
                My Posts
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all focus:outline-none hover:outline-none ${
                  selectedTab !== "posts"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-50"
                } `}
                onClick={() => setSelectedTab("favourites")}
              >
                <span>❤️</span>
                Favorites
              </button>
            </div>
          </div>
          {selectedTab === "posts" ? (
            <Posts posts={myPosts} setPosts={setMyPosts} />
          ) : (
            <Posts posts={favouritePosts} setPosts={setFavouritePosts} />
          )}
        </main>
      </div>
    </UserContext>
  );
};

export default Profile;
