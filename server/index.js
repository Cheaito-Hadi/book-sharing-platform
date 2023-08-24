const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");
const authMiddleware = require("./middlewares/auth.middleware");
require("dotenv").config();
app.use(express.json());
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    mongooseConnect();
});