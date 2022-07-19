import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import TMDB from "../../../../tmdb/TMDB";
import { ChartBodyCellProps } from "../../model/ChartProps";

class ChartService {

    public static async getShowEpisodesChart(showId?: number, seasons?: SeasonResponse[]) {
        const body = await Promise.all(
            seasons ? seasons.map(async (season) => ChartService.getSeason(showId, season.season_number)) : []
        );
        return ({
            title: 'Episode rating',
            chart: {
                header: seasons?.map(season => `S${season.season_number}`).filter((_, i) => body[i].length > 0),
                body: {
                    episode: ChartService.getEpisodeColumn(body),
                    ratings: body.filter(row => row.length > 0)
                },
            }
        });
    }

    static async getSeason(showId?: number, seasonNumber?: number): Promise<ChartBodyCellProps[]> {
        if (!showId || !seasonNumber) return [];
        const season = await TMDB.season.getDetails(showId, seasonNumber);
        return season.episodes ? season.episodes.map(ChartService.getEpisodeCell) : [];
    }

    static getEpisodeCell = (episode: Episode) => {
        const rating = ChartService.getRating(episode?.vote_average);
        return {
            rating,
            value: rating === -1 ? "-" : rating,
            href: `/s/${episode.season_number}/e/${episode.episode_number}`,
            title: episode.name ?? ""
        };
    }

    static getEpisodeColumn = (body: any[][]) => Array(ChartService.getSeasonWithMaxEpisodes(body)).fill('').map((_, i) => i + 1);

    static getSeasonWithMaxEpisodes = (body: any[][]) => body ? Math.max(...body.map(column => column.length)) : 0;

    static getRating = (voteAverage?: number) => voteAverage ? +voteAverage.toFixed(1) : -1
}

export default ChartService;