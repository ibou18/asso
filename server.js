// import et definition
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postIdeaRoutes = require("./routes/postIdeaRoutes");
const contributionRoutes = require("./routes/contributionRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
require("dotenv").config({ path: "./.env" });
require("./config/db");
const { verificationToken } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//cors
var cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// jwt
app.get("/checkuser", verificationToken);

// app.get("/", verificationToken, (req, res) => {
//   res.status(200).send("cool");
// });

// routes
app.use("/api/user", userRoutes);
app.use("/api/postIdea", postIdeaRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/contribution", contributionRoutes);
app.use("/api/meeting", meetingRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
