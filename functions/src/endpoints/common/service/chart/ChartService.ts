import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import TMDB from "../../../../tmdb/TMDB";

class ChartService {

    public static async getShowEpisodesChart(showId?: number, seasons?: SeasonResponse[]) {
        const body =  await Promise.all(
            seasons ? seasons.map(async (season) => ChartService.getSeason(showId, season.season_number)) : []
        );
        return ({
            title: 'Episode rating',
            chart: {
              header: seasons?.map(season => `S${season.season_number}`).filter((_, i) => body[i].length > 0),
              body: body.filter(row => row.length > 0),
            }
        });
    }

    static async getSeason (showId?: number, seasonNumber?: number): Promise<number[]> {
        if(!showId || !seasonNumber) return [];
        const season = await TMDB.season.getDetails(showId, seasonNumber);
        return season.episodes ? season.episodes.map(episode => episode.vote_average ? +episode.vote_average.toFixed(1) : -1) : [];
    }
}

export default ChartService;