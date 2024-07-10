const express = require('express');
require("dotenv").config();

const connectDb = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const app = express();
app.use(express.json());

connectDb();

app.use('/api/users', userRouter);
app.use('/admin/api/movies', movieRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});