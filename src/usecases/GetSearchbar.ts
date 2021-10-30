const getMovieSearchbar = () => ({
  placeholder: `Search movies...`,
  path: `/movie/search/:query`
});

const getTVShowSearchbar = () => ({
  placeholder: `Search shows...`,
  path: `/tv/search/:query`
});

const getPeopleSearchbar = () => ({
  placeholder: `Search people...`,
  path: `/person/search/:query`
});

export { getMovieSearchbar, getTVShowSearchbar, getPeopleSearchbar };
