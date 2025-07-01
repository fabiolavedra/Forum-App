const PostsController = require("../controllers/posts.controllers");
const { authenticate } = require("../middleware/authenticate");
module.exports = (app) => {
  app.get("/api/posts", authenticate, PostsController.getAllPosts);
  app.put("/api/posts/:id", authenticate, PostsController.updatePost);
  app.post("/api/posts/:id/like", authenticate, PostsController.likePost);
  app.post("/api/posts/:id/unlike", authenticate, PostsController.unlikePost);
  app.post("/api/posts/:id/reply", authenticate, PostsController.reply);
  app.delete(
    "/api/posts/:id/reply/:replyId",
    authenticate,
    PostsController.deleteReply
  );
  app.put(
    "/api/posts/:id/reply/:replyId",
    authenticate,
    PostsController.editReply
  );
  app.post("/api/posts", authenticate, PostsController.createPost);
  app.delete("/api/posts/:id", authenticate, PostsController.deletePost);
  app.get("/api/posts/me", authenticate, PostsController.getMyPosts);
};
