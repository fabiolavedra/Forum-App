const UserController = require("../controllers/users.controller.js");
const { authenticate } = require("../middleware/authenticate.js");

module.exports = (app) => {
  app.post("/api/users/login", UserController.login);
  app.post("/api/users/register", UserController.register);
  app.post("/api/users/logout", authenticate, UserController.logout);
  app.get("/api/users/me", authenticate, UserController.getMe);
  app.post(
    "/api/users/favourite/:id",
    authenticate,
    UserController.addFavourite
  );
  app.post(
    "/api/users/unfavourite/:id",
    authenticate,
    UserController.unfavourite
  );
  app.get("/api/users/favourites", authenticate, UserController.getFavourites);
};
