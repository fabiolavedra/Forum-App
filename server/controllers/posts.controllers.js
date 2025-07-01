const Post = require("../models/post.model");

module.exports.createPost = async (req, res) => {
  console.log("dfghjk", req.user);
  const newPost = await Post.create({ ...req.body, createdBy: req.user.id });
  const populatedPost = await Post.findById(newPost._id)
    .populate("createdBy")
    .populate("replies.user");

  return res.json(populatedPost);
};

module.exports.updatePost = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  if (post.createdBy.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Not authorized to edit this post." });
  }
  const updatedPost = await Post.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )
    .populate("createdBy")
    .populate("replies.user");
  return res.json(updatedPost);
};

module.exports.deletePost = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  if (!post) {
    console.log("req.params.id", req.params.id, post);
    return res.status(404).json({ message: "Post not found!" });
  }
  if (post.createdBy.toString() !== userId && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this post." });
  }
  await post.deleteOne();
  return res.json({ message: "Post deleted successfully." });
};

module.exports.getAllPosts = (req, res) => {
  Post.find()
    .populate("createdBy")
    .populate("replies.user")
    .sort({
      createdAt: -1,
    })
    .then((allPosts) => {
      res.json(allPosts);
    })
    .catch((err) => res.json(err));
};

module.exports.likePost = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  if (post.likes.includes(userId)) {
    return res
      .status(400)
      .json({ message: "You have already liked this post!" });
  }

  post.likes.push(userId);
  await post.save();
  const populatedPost = await Post.findById(req.params.id)
    .populate("createdBy")
    .populate("replies.user");
  return res.json(populatedPost);
};

module.exports.unlikePost = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  if (!post.likes.includes(userId)) {
    return res.json({ message: "You haven't liked this post!" });
  }

  post.likes.pull(userId);
  await post.save();
  const populatedPost = await Post.findById(req.params.id)
    .populate("createdBy")
    .populate("replies.user");
  return res.json(populatedPost);
};

module.exports.reply = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  const reply = req.body;
  post.replies.unshift({ ...reply, user: req.user.id });
  await post.save();
  const populatedPost = await Post.findById(req.params.id)
    .populate("createdBy")
    .populate("replies.user");

  return res.json(populatedPost);
};

module.exports.deleteReply = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  console.log(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  const reply = post.replies.id(req.params.replyId);
  console.log("'fghjk", req.params.replyId);

  if (reply.user.toString() !== userId && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to edit this reply." });
  }
  if (reply) {
    post.replies.pull(reply._id);
    await post.save();
    return res.json(post);
  }
  return res.json(post);
};

module.exports.editReply = async (req, res) => {
  const userId = req.user.id;
  const post = await Post.findById(req.params.id);
  console.log(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  const reply = post.replies.id(req.params.replyId);
  if (!reply) {
    return res.status(400).json({ message: "Reply not found!" });
  }
  if (reply.user.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Not authorized to edit this reply." });
  }
  reply.content = req.body.content || reply.content;
  reply.updatedAt = newDate();
  await post.save();
  return res.json({ message: "Reply updated", post });
};

module.exports.getMyPosts = async (req, res) => {
  const userId = req.user.id;

  const allPosts = await Post.find({ createdBy: userId })
    .populate("createdBy")
    .populate("replies.user");

  return res.json(allPosts);
};
