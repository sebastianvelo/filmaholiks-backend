import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";

class TitleHelper {

    public static getTitle = (title?: string): string => `${title} | Filmaholiks`;

    public static explore = {
        getMovieTitle: () => TitleHelper.getTitle(`Movies`),
        getShowTitle: () => TitleHelper.getTitle(`TV Shows`),
        getPersonTitle: () => TitleHelper.getTitle(`People`),
    };

    public static detail = {
        getMovieTitle: (movie: MovieResponse) =>
            TitleHelper.getTitle(movie?.title),
        getPersonTitle: (person: PersonDetailsResponse) =>
            TitleHelper.getTitle(person.name),
        getShowTitle: (show: TVShowResponse) =>
            TitleHelper.getTitle(show.name),
        getSeasonTitle: (season: SeasonWithEpisodesResponse) =>
            TitleHelper.getTitle(season.name),
        getEpisodeTitle: (episode: EpisodeResponse) =>
            TitleHelper.getTitle(episode.name),
    };

    public static search = {
        getTitle: (query: string) =>
            TitleHelper.getTitle(`Results of "${query}"`)
    };
}

export default TitleHelper;
