const express = require("express");
const app = express();
const cors = require("cors");

require("./config/mongoose.config");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json(), express.urlencoded({ extended: true }));

const Routes = require("./routes/user.routes");
Routes(app);

const Notes = require("./routes/posts.routes");
Notes(app);

app.listen(8000, () => console.log("The server is listening on port 8000!"));
