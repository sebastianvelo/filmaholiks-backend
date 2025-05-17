const WatchlistEndpoints = {
  search: "/user/:uid/:mediaType/search/:query",
  getWatchlist: "/user/:uid/:mediaType",
  addList: "/user/:uid/:mediaType/list",
  saveAllLists: "/user/:uid/:mediaType/list",
  deleteList: "/user/:uid/:mediaType/:listIdx/list",
  swapLists: "/user/:uid/:mediaType/swap/list",
  changeListTitle: "/user/:uid/:mediaType/change/list",
  addItem: "/user/:uid/:mediaType/:listIdx/item",
  deleteItem: "/user/:uid/:mediaType/:listIdx/item",
  swapItems: "/user/:uid/:mediaType/swap/item",
  moveItem: "/user/:uid/:mediaType/move/item",
};

export default WatchlistEndpoints;