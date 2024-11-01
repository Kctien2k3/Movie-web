const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");
const authenticateUser = require("../middleware/authMiddleware");

router.get("/trending", authenticateUser, movieController.getTrendingMovies);

router.get("/top-rate", authenticateUser, movieController.getTopRatedMovies);

router.get("/discover", authenticateUser, movieController.getMoviesByGenre);

router.post("/video", authenticateUser, movieController.postMovieTrailer);

router.post("/search", authenticateUser, movieController.postSearchMovies);

module.exports = router;
