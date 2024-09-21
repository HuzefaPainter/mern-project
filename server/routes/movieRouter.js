const movieRouter = require('express').Router();
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie, getMovieById,
} = require("../controllers/movieControllers");
const { auth, adminAuth } = require('../middlewares/authMiddlewares');

movieRouter.post('/add-movie', adminAuth, addMovie);
movieRouter.get('/get-all-movies', auth, getAllMovies);
movieRouter.get('/:id', auth, getMovieById);
movieRouter.put('/update-movie', adminAuth, updateMovie);
movieRouter.delete('/delete-movie/:id', adminAuth, deleteMovie);

module.exports = movieRouter;