import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailContentInfoModel } from "../../../../shared/model/pages/detail/header/DetailContentModel";
import UserEntity from "../../../entity/user/UserEntity";
import DataItemModel from "../../../model/data-item/DataItemModel";
import * as DateHelper from "../../date/DateHelper";

export const getUser = (user: UserEntity): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Name`, user.name),
        DataItemModel(`E-Mail`, user.email),
        DataItemModel(`Filmaholik since`, DateHelper.toString(user.registered)),
    ]
});

export const getMovie = (movie: MovieResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Rating`, `${movie.vote_average?.toFixed(2)} ⭐️`),
        DataItemModel(`Genres`, movie.genres?.map((genre) => genre.name).join(", ")),
        DataItemModel(`Duration`, `${movie.runtime}m`),
        DataItemModel(`Language`, movie.original_language),
        DataItemModel(`Release`, DateHelper.getFullMessage(movie.release_date)),
        DataItemModel(`Budget`, `$${movie.budget}`),
        DataItemModel(`Revenue`, `$${movie.revenue}`),
        DataItemModel(`Status`, movie.status),
    ]
});

export const getPerson = (person: PersonDetailsResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Birthday`, person.deathday ? DateHelper.getFullMessage(person.birthday, person.deathday) : DateHelper.getFullMessage(person.birthday)),
        DataItemModel(`Deathday`, person.deathday ? DateHelper.getFullMessage(person.deathday) : undefined),
        DataItemModel(`Place of birth`, person.place_of_birth),
        DataItemModel(`Known for`, person.known_for_department),
    ]
});

export const getShow = (show: TVShowResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Rating`, `${show.vote_average?.toFixed(2)} ⭐️`),
        DataItemModel(`Genres`, show.genres?.map((genre) => genre.name).join(", ")),
        DataItemModel(`Language`, show.original_language),
        DataItemModel(`Release`, DateHelper.getFullMessage(show.first_air_date)),
        DataItemModel(`Status`, show.status),
    ]
});

export const getSeason = (season: SeasonWithEpisodesResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Air date`, DateHelper.getFullMessage(season.air_date)),
        DataItemModel(`Episodes`, `${season.episodes?.length}`),
    ]
});

export const getEpisode = (episode: EpisodeResponse): DetailContentInfoModel => ({
    data: [
        DataItemModel(`Air date`, DateHelper.getFullMessage(episode.air_date)),
    ]
});