const getMovieSearchbar = () => ({
  placeholder: `Search movies...`,
  path: `/movie/search/:query`
});

const getShowSearchbar = () => ({
  placeholder: `Search shows...`,
  path: `/show/search/:query`
});

const getPeopleSearchbar = () => ({
  placeholder: `Search people...`,
  path: `/person/search/:query`
});

export { getMovieSearchbar, getShowSearchbar, getPeopleSearchbar };
