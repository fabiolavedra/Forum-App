import Post from "./Post";

const Posts = ({ posts, setPosts }) => {
  return (
    <div className="space-y-6">
      {posts?.map((post, index) => {
        return (
          <div key={index}>
            <Post post={post} posts={posts} setPosts={setPosts} />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
