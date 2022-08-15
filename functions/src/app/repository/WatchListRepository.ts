import WatchlistEntity, { WatchlistEntityEmpty } from "./entity/watch-list/WatchlistEntity";
import { movieWatchlistMock, showWatchlistMock } from "../mock/watchlist-mocked";

const dbShowWatchlistMock = showWatchlistMock;
const dbMovieWatchlistMock = movieWatchlistMock;

class WatchListRepository {

    public static shows = {
        getByUser: (userName: string): WatchlistEntity =>
            dbShowWatchlistMock.find((item) => item.userName === userName)?.watchlist ?? WatchlistEntityEmpty,
        save: (userName: string, lists: WatchlistEntity): void => {
            const idx = dbShowWatchlistMock.findIndex((item) => item.userName === userName);
            if (idx !== -1) {
                dbShowWatchlistMock[idx].watchlist = lists;
            }
        },
    };

    public static movies = {
        getByUser: (userName: string): WatchlistEntity =>
            dbMovieWatchlistMock.find((item) => item.userName === userName)?.watchlist ?? WatchlistEntityEmpty,
        save: (userName: string, lists: WatchlistEntity): void => {
            const idx = dbMovieWatchlistMock.findIndex((item) => item.userName === userName);
            if (idx !== -1) {
                dbMovieWatchlistMock[idx].watchlist = lists;
            }
        }
    }

}

export default WatchListRepository;