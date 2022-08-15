import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailContentHeaderModel } from "../../../model/pages/detail/header/DetailContentModel";
import UserEntity from "../../../../repository/model/user/UserEntity";

export const getUser = (user: UserEntity): DetailContentHeaderModel => ({
    title: `${user.userName}`
});

export const getMovie = (movie: MovieResponse): DetailContentHeaderModel => ({
    title: `${movie.title}`
});

export const getPerson = (person: PersonDetailsResponse): DetailContentHeaderModel => ({
    title: `${person.name}`,
});

export const getShow = (shpw: TVShowResponse): DetailContentHeaderModel => ({
    title: `${shpw.original_name}`,
});

export const getSeason = (season: SeasonWithEpisodesResponse): DetailContentHeaderModel => ({
    title: `${season.name}`,
});

export const getEpisode = (episode: EpisodeResponse): DetailContentHeaderModel => ({
    title: `${episode.name} (${episode.season_number}x${episode.episode_number})`,
})
