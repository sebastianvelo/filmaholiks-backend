import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import { SeasonResponse } from "tmdb-js/lib/api/request/season/response/Response";
import ChartModel, { ChartBodyCellModel } from "@shared/model/components/ChartModel";
import TMDB from "@TMDB/TMDB";
import { getTMDBImage } from "../media/MediaHelper";

class ChartHelper {

    public static showEpisodes = {
        getChartSection: async (showId?: number, seasons?: SeasonResponse[]) => {
            const chart = await ChartHelper.showEpisodes.getChart(showId, seasons);
            return {
                title: `Episode rating`,
                chart
            };
        },
        getChart: async (showId?: number, seasons?: SeasonResponse[]): Promise<ChartModel> => {
            const bodyCells: ChartBodyCellModel[][] = seasons && showId ? await ChartHelper.showEpisodes.getBodyColumns(showId, seasons) : [];
            return {
                header: ChartHelper.showEpisodes.getChartHeader(bodyCells, seasons),
                body: ChartHelper.showEpisodes.getChartBody(bodyCells),
            };
        },
        getChartHeader: (bodyCells: ChartBodyCellModel[][], seasons?: SeasonResponse[]) =>
            seasons?.map(season => `S${season.season_number}`).filter((_, i) => bodyCells[i].length > 0) ?? [],
        getChartBody: (bodyCells: ChartBodyCellModel[][]) => ({
            episode: ChartHelper.showEpisodes.getEpisodeNumberColumn(bodyCells),
            ratings: bodyCells.filter(row => row.length > 0)
        }),
        getBodyColumns: (showId: number, seasons: SeasonResponse[]): Promise<ChartBodyCellModel[][]> =>
            Promise.all(seasons.map(async (season) => ChartHelper.showEpisodes.getSeasonColumn(showId, season.season_number))),
        getSeasonColumn: async (showId: number, seasonNumber: number): Promise<ChartBodyCellModel[]> => {
            const season = await TMDB.season.getDetails(showId, seasonNumber);
            return season.episodes && season.season_number ? season.episodes.map(ChartHelper.showEpisodes.getEpisodeCell) : [];
        },
        getEpisodeCell: (episode: Episode): ChartBodyCellModel => {
            const rating = ChartHelper.showEpisodes.getRating(episode?.vote_average);
            const value = rating === -1 ? "-" : rating;
            const href = `/s/${episode.season_number}/e/${episode.episode_number}`;
            return {
                rating,
                value,
                href,
                image: getTMDBImage(episode.still_path, episode?.name),
                title: episode.name
            };
        },
        getEpisodeNumberColumn: (body: ChartBodyCellModel[][]) => Array(ChartHelper.showEpisodes.getSeasonWithMaxEpisodes(body)).fill('').map((_, i) => i + 1),
        getSeasonWithMaxEpisodes: (body: ChartBodyCellModel[][]) => body ? Math.max(...body.map(column => column.length)) : 0,
        getRating: (voteAverage?: number) => voteAverage ? +voteAverage.toFixed(1) : -1,
    }
}

export default ChartHelper;