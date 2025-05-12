import UsersDatabase from "../../api/entities/user/UsersDatabase";
import WatchlistsDatabase from "../../api/entities/watch-list/WatchlistsDatabase";
import MediaType from "../../shared/types/MediaType";

const Database = {
    users: UsersDatabase,
    watchlist: (mediaType: MediaType) => new WatchlistsDatabase(mediaType),
};

export default Database;
