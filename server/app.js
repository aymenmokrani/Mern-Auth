const express = require("express");
const cors = require("cors");
const users = require("./databank/users");
const authRoute = require("./routes/authRoutes");
const envs = require("./config/config");
const connectDb = require("./config/dbConnection");

// APP Init
const app = express();

// DB Connection
connectDb();

//MiddleWares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.send("this is server");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not founded",
  });
});

// Server Start
app.listen(process.env.PORT, () => {
  console.log("Listening to you ... ", process.env.PORT);
});
