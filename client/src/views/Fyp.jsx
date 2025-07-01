import Posts from "../components/Posts";
import PostCreation from "../components/PostCreation";
import Header from "../components/Header";
import { useMemo, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import UserContext from "../components/UserContext";
import PopularTags from "../components/PopularTags";
import { useNavigate } from "react-router-dom";

const Fyp = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setnewPost] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        import.meta.env.VITE_API_URL + "/api/posts",
        { content: newPost },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setPosts([res.data, ...posts]);
        setnewPost("");
      });
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/posts", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
        if (err.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search) return posts;
    return posts.filter((post) => post.content.includes(search));
  }, [search, posts]);

  return (
    <UserContext value={{ loggedUser, setLoggedUser }}>
      <Header
        setPosts={setPosts}
        allPosts={posts}
        search={search}
        setSearch={setSearch}
        redirect="/profile"
      />
      <div className="grid grid-cols-12 gap-6 mx-auto max-w-7xl">
        <aside className="col-span-3 mt-28">
          <PopularTags />
        </aside>

        <main className="col-span-8 col-start-4">
          <PostCreation
            handleSubmit={handleSubmit}
            newPost={newPost}
            setnewPost={setnewPost}
          />
          <Posts posts={filteredPosts} setPosts={setPosts} />
        </main>
      </div>
    </UserContext>
  );
};

export default Fyp;
