import MediaType from "../../shared/types/MediaType";
import UsersDatabase from "./UsersDatabase";
import WatchlistsDatabase from "./WatchlistsDatabase";

const Database = {
    users: UsersDatabase,
    watchlist: (mediaType: MediaType) => new WatchlistsDatabase(mediaType),
};

export default Database;
