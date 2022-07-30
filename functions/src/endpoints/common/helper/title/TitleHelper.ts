import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";

class TitleHelper {

    public static getTitle = (title?: string): string => `${title} | Filmaholiks`;

    public static movie = {
        getExplore: () => TitleHelper.getTitle(`Movies`),
        getDetail: (movie: MovieResponse) => TitleHelper.getTitle(movie?.title),
    };

    public static people = {
        getExplore: () => TitleHelper.getTitle(`People`),
        getDetail: (person: PersonDetailsResponse) => TitleHelper.getTitle(person.name),
    };

    public static show = {
        getExplore: () => TitleHelper.getTitle(`TV Shows`),
        getDetail: (show: TVShowResponse) => TitleHelper.getTitle(show.name),
    };

    public static season = {
        getDetail: (season: SeasonWithEpisodesResponse) => TitleHelper.getTitle(season.name),
    };

    public static episode = {
        getDetail: (episode: EpisodeResponse) => TitleHelper.getTitle(episode.name),
    };

    public static search = {
        getTitle: (query: string) => TitleHelper.getTitle(`Results of "${query}"`)
    };

    public static chart = {
        getTitle: () => TitleHelper.getTitle(`Episode rating`)
    }
}

export default TitleHelper;
