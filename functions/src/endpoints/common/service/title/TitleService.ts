import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";

class TitleService {

    public static getTitle = (title?: string): string => `${title} | Filmaholiks`;

    public static explore = {
        getMovieTitle: () => TitleService.getTitle(`Movies`),
        getShowTitle: () => TitleService.getTitle(`TV Shows`),
        getPersonTitle: () => TitleService.getTitle(`People`),
    };

    public static detail = {
        getMovieTitle: (movie: MovieResponse) =>
            TitleService.getTitle(movie?.title),
        getPersonTitle: (person: PersonDetailsResponse) =>
            TitleService.getTitle(person.name),
        getShowTitle: (show: TVShowResponse) =>
            TitleService.getTitle(show.name),
        getSeasonTitle: (season: SeasonWithEpisodesResponse) =>
            TitleService.getTitle(season.name),
        getEpisodeTitle: (episode: EpisodeResponse) =>
            TitleService.getTitle(episode.name),
    };

    public static search = {
        getTitle: (query: string) =>
            TitleService.getTitle(`Results of "${query}"`)
    };
}

export default TitleService;
