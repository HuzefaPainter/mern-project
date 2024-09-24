const express = require('express');
require("dotenv").config();

const connectDb = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");
const movieRouter = require("./routes/movieRouter");
const theatreRouter = require("./routes/theatreRouter");
const showRouter = require("./routes/showRouter");
const screenRouter = require("./routes/screenRouter");
const app = express();
app.use(express.json());

connectDb();

app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/shows', showRouter);
app.use('/api/screens', screenRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});