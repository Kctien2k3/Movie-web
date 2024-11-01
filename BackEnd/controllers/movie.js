const Movies = require("../models/movie");
const Genre = require("../models/genre");
const Video = require("../models/video");
const MOVIES_PER_PAGE = 20;

exports.getTrendingMovies = (req, res, next) => {
  const movies = Movies.all();
  const sortedMovies = movies.sort((a, b) => b.popularity - a.popularity); /// tạo sắp xếp thứ tự giảm dần độ phổ biến của film

  let page = parseInt(req.query.page) || 1; /// lấy tham số page, nếu không có mặc định là 1
  /// phân trang
  const totalMovies = sortedMovies.length;
  const totalPage = Math.ceil(totalMovies / MOVIES_PER_PAGE);
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = page * MOVIES_PER_PAGE;

  const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

  res.status(200).json({
    result: paginatedMovies,
    page: page,
    total_pages: totalPage,
  });
};

exports.getTopRatedMovies = (req, res, next) => {
  const movies = Movies.all();
  const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);

  let page = parseInt(req.query.page) || 1;

  // phân trang
  const totalMoives = sortedMovies.length;
  const totalPage = Math.ceil(totalMoives / MOVIES_PER_PAGE);
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = page * MOVIES_PER_PAGE;

  const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

  res.status(200).json({
    result: paginatedMovies,
    page: page,
    total_pages: totalPage,
  });
};

exports.getMoviesByGenre = (req, res, next) => {
  const genreId = parseInt(req.query.genre); // lấy id
  // console.log(genreId);
  let page = parseInt(req.query.page) || 1;

  if (!genreId) {
    return res.status(400).json({
      message: "Not found genre param",
    });
  }
  // tìm genre dựa trên thể loại
  const genreList = Genre.all();
  // console.log(genreList);
  const genre = genreList.find((g) => g.id === genreId);
  // console.log(genre);

  if (!genre) {
    return res.status(400).json({ message: "Not found that genre id" });
  }

  // Lọc phim theo genre_id
  const movies = Movies.all();
  const filteredMovies = movies.filter((movie) =>
    movie.genre_ids.includes(genreId)
  );

  // phân trang
  const totalMoives = filteredMovies.length;
  const totalPages = Math.ceil(totalMoives / MOVIES_PER_PAGE);
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = page * MOVIES_PER_PAGE;

  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  // Trả về kết quả
  res.status(200).json({
    result: paginatedMovies,
    page: page,
    total_pages: totalPages,
    genre_name: genre.name,
  });
};

exports.postMovieTrailer = (req, res, next) => {
  const filmId = parseInt(req.body.film_id);
  console.log(filmId);

  if (!filmId) {
    return res.status(400).json({ message: "Not found film_id param" });
  }

  // lấy data video.json và tìm video theo filmId
  const videoList = Video.all();
  // console.log(videoList);
  const movie = videoList.find((movie) => movie.id === filmId);
  console.log(movie);

  // Nếu không tìm thấy phim
  if (!movie) {
    return res.status(404).json({ message: "Not found video" });
  }

  // Lọc ra các video hợp lệ (official, YouTube, Trailer hoặc Teaser)
  const filterVideos = movie.videos.filter(video => 
    video.official && video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  if (filterVideos.length  === 0 ){
    return res.status(404).json({ message: "Not found video" });
  }

  // lọc độ ưu tiền cho trailer sau đó teaser
  filterVideos.sort((a,b) => new Date(b.published_at) - new Date(a.published_at));

  const trailer = filterVideos.find(video => video.type === 'Trailer') || filterVideos[0];

  //trả về result
  return res.status(200).json(trailer);

  
};

exports.postSearchMovies = (req, res, next) => {
  const keyword = req.body.inputkeyword?.toLowerCase();
  let page = parseInt(req.query.page) || 1;

  // lỗi nếu không có keyword
  if (!keyword) {
    res.status(400).json({
      message: "Not found keyword param!"
    });
  }

  // lấy toàn bộ movie
  const movies = Movies.all();
  // lọc file theo keyword
  const filteredSearchMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(keyword) || movie.overview.toLowerCase().includes(keyword);
  });
  

  // phân trang 
  const totalMoives = filteredSearchMovies.length;
  const totalPages = Math.ceil(totalMoives/MOVIES_PER_PAGE);
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = page * MOVIES_PER_PAGE;

  const paginatedMovies = filteredSearchMovies.slice(startIndex, endIndex);


  // trả về dữ liệu
  res.status(200).json({
    result: paginatedMovies,
    page: page,
    total_pages: totalPages
  });
}

