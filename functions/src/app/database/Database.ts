import UsersDatabase from "../../api/entities/user/db/Users.database";
import WatchlistsDatabase from "../../api/entities/watch-list/db/Watchlists.database";
import MediaType from "../../shared/types/MediaType";

const Database = {
    users: UsersDatabase,
    watchlist: (mediaType: MediaType) => new WatchlistsDatabase(mediaType),
};

export default Database;
