import WatchlistModel, { WatchlistModelEmpty } from "../model/watch-list/WatchlistModel";
import { movieWatchlistMock, showWatchlistMock } from "../../mock/watchlist-mocked";

const dbShowWatchlistMock = showWatchlistMock;
const dbMovieWatchlistMock = movieWatchlistMock;

class WatchListRepository {

    public static shows = {
        getByUser: (userName: string): WatchlistModel =>
            dbShowWatchlistMock.find((item) => item.userName === userName)?.watchlist ?? WatchlistModelEmpty,
        save: (userName: string, lists: WatchlistModel): void => {
            const idx = dbShowWatchlistMock.findIndex((item) => item.userName === userName);
            if (idx !== -1) {
                dbShowWatchlistMock[idx].watchlist = lists;
            }
        },
    };

    public static movies = {
        getByUser: (userName: string): WatchlistModel =>
            dbMovieWatchlistMock.find((item) => item.userName === userName)?.watchlist ?? WatchlistModelEmpty,
        save: (userName: string, lists: WatchlistModel): void => {
            const idx = dbMovieWatchlistMock.findIndex((item) => item.userName === userName);
            if (idx !== -1) {
                dbMovieWatchlistMock[idx].watchlist = lists;
            }
        }
    }

}

export default WatchListRepository;