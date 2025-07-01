const PostCreation = ({ handleSubmit, newPost, setnewPost }) => {
  // const [newPost, setnewPost] = useState("");
  // console.log("newpost", newPost);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post(
  //       "http://localhost:8000/api/posts",
  //       { content: newPost },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setnewPost("");
  //     });
  // };

  return (
    <form
      className="bg-white rounded-lg border border-gray-200 p-4 mb-6 mt-4"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center space-x-3">
        <input
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Let's share what going on your mind..."
          value={newPost}
          onChange={(e) => setnewPost(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600">
          Create Post
        </button>
      </div>
    </form>
  );
};

export default PostCreation;
