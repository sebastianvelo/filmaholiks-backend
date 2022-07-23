import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DataItemProps } from "../../../../detail/model/DetailPageProps";
import DataItemService from "../../data-item/DataItemService";

class DetailDescriptionService {

    public static getShowDescription = (tv: TVShowResponse): DataItemProps | undefined =>
        DataItemService.getDataItem(`Description`, `${tv.overview}`);

    public static getMovieDescription = (movie: MovieResponse): DataItemProps | undefined =>
        DataItemService.getDataItem(`Description`, `${movie.overview}`);

    public static getPersonDescription = (person: PersonDetailsResponse): DataItemProps | undefined =>
        DataItemService.getDataItem(`Biography`, person.biography);

    public static getSeasonDescription = (season: SeasonWithEpisodesResponse): DataItemProps | undefined =>
        DataItemService.getDataItem(`Description`, season.overview);

    public static getEpisodeDescription = (episode: EpisodeResponse): DataItemProps | undefined =>
        DataItemService.getDataItem(`Description`, episode.overview);
}

export default DetailDescriptionService;