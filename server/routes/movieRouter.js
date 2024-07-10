const movieRouter = require('express').Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieControllers");
const auth = require('../middlewares/authMiddlewares');

movieRouter.post('/add-movie', addMovie);
movieRouter.get('/get-all-movies', getAllMovies);
movieRouter.put('/update-movie', updateMovie);
movieRouter.delete('/delete-movie/:id', deleteMovie);

module.exports = movieRouter;