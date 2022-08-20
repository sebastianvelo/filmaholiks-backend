import MediaType from "../common/MediaType";
import UsersDatabase from "./UsersDatabase";
import WatchlistsDatabase from "./WatchlistsDatabase";

const Database = {
    users: UsersDatabase,
    watchlist: (mediaType: MediaType) => new WatchlistsDatabase(mediaType),
};

export default Database;
