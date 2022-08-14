import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";

const getTitle = (title?: string): string => `${title} | Filmaholiks`;

export const user = {
    getDetail: (userName: string) => getTitle(userName),
};

export const movie = {
    getExplore: () => getTitle(`Movies`),
    getDetail: (movie: MovieResponse) => getTitle(movie?.title),
};

export const people = {
    getExplore: () => getTitle(`People`),
    getDetail: (person: PersonDetailsResponse) => getTitle(person.name),
};

export const show = {
    getExplore: () => getTitle(`TV Shows`),
    getDetail: (show: TVShowResponse) => getTitle(show.name),
};

export const season = {
    getDetail: (season: SeasonWithEpisodesResponse) => getTitle(season.name),
};

export const episode = {
    getDetail: (episode: EpisodeResponse) => getTitle(episode.name),
};

export const search = {
    getTitle: (query: string) => getTitle(`Results of "${query}"`)
};

