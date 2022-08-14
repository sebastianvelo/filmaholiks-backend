import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailHeaderProps } from "../../../endpoints/detail/model/DetailPageProps";
import UserModel from "../../../repository/model/user/UserModel";

export const getUser = (user: UserModel): DetailHeaderProps => ({
    title: `${user.userName}`
});

export const getMovie = (movie: MovieResponse): DetailHeaderProps => ({
    title: `${movie.title}`
});

export const getPerson = (person: PersonDetailsResponse): DetailHeaderProps => ({
    title: `${person.name}`,
});

export const getShow = (shpw: TVShowResponse): DetailHeaderProps => ({
    title: `${shpw.original_name}`,
});

export const getSeason = (season: SeasonWithEpisodesResponse): DetailHeaderProps => ({
    title: `${season.name}`,
});

export const getEpisode = (episode: EpisodeResponse): DetailHeaderProps => ({
    title: `${episode.name} (${episode.season_number}x${episode.episode_number})`,
})
