const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const signupRouter = require("./routes/signup.js");
const loginRouter = require("./routes/login.js");
dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// console.log("Signup router type:", typeof signupRouter);
// console.log("Login router type:", typeof loginRouter);

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
