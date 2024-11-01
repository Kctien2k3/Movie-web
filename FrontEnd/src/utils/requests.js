const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";

const requests = {
  // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  // fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  // fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  // fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  // fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  // fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  // fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,

  fetchTrending: `/trending?token=8qlOkxz4wq`,
  fetchNetflixOriginals: `/trending?token=8qlOkxz4wq`,
  fetchTopRated: `/top-rate?token=8qlOkxz4wq`,
  fetchActionMovies: `/discover?genre=28&token=8qlOkxz4wq`,
  fetchComedyMovies: `/discover?genre=35&token=8qlOkxz4wq`,
  fetchHorrorMovies: `/discover?genre=27&token=8qlOkxz4wq`,
  fetchRomanceMovies: `/discover?genre=10749&token=8qlOkxz4wq`,
  fetchDocumentaries: `/discover?genre=99&token=8qlOkxz4wq`,
  fetchSearch: `/search?token=8qlOkxz4wq`,
};

export default requests;
