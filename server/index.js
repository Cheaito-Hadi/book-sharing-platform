const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(
    "/uploads/images",
    express.static(path.join(__dirname, "../../storage/uploads/images"))
);
const authRouter = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/auth.middleware");
app.use("/auth", authRouter);
const shareRouter = require("./routes/Share.routes");
app.use("/share", authMiddleware, shareRouter);
const uploadImage = require("./routes/uploadImage.routes");
app.use("/uploadImage", uploadImage);
const followRouter = require("./routes/follow.routes");
app.use("/user", followRouter);
const userLikes = require("./routes/like.routes");
app.use("/like", userLikes);
const searchRouter = require("./routes/search.routes");
app.use("/search", searchRouter);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    mongooseConnect();
});