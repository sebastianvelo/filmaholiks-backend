import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailInfoProps } from "../../../endpoints/detail/model/DetailPageProps";
import UserModel from "../../../repository/model/user/UserModel";
import { getDataItem } from "../../data-item/DataItemHelper";
import * as DateHelper from "../../date/DateHelper";

class DetailInfoHelper {

    public static getUser = (user: UserModel): DetailInfoProps => ({
        data: [
            getDataItem(`Name`, user.name),
            getDataItem(`E-Mail`, user.email),
            getDataItem(`Filmaholik since`, DateHelper.toString(user.registered)),
        ]
    });

    public static getMovie = (movie: MovieResponse): DetailInfoProps => ({
        data: [
            getDataItem(`Rating`, `${movie.vote_average?.toFixed(2)} ⭐️`),
            getDataItem(`Genres`, movie.genres?.map((genre) => genre.name).join(", ")),
            getDataItem(`Duration`, `${movie.runtime}m`),
            getDataItem(`Language`, movie.original_language),
            getDataItem(`Release`, DateHelper.getFullMessage(movie.release_date)),
            getDataItem(`Budget`, `$${movie.budget}`),
            getDataItem(`Revenue`, `$${movie.revenue}`),
            getDataItem(`Status`, movie.status),
        ]
    });

    public static getPerson = (person: PersonDetailsResponse): DetailInfoProps => ({
        data: [
            getDataItem(`Birthday`, person.deathday ? DateHelper.getFullMessage(person.birthday, person.deathday) : DateHelper.getFullMessage(person.birthday)),
            getDataItem(`Deathday`, person.deathday ? DateHelper.getFullMessage(person.deathday) : undefined),
            getDataItem(`Place of birth`, person.place_of_birth),
            getDataItem(`Known for`, person.known_for_department),
        ]
    });

    public static getShow = (show: TVShowResponse): DetailInfoProps => ({
        data: [
            getDataItem(`Rating`, `${show.vote_average?.toFixed(2)} ⭐️`),
            getDataItem(`Genres`, show.genres?.map((genre) => genre.name).join(", ")),
            getDataItem(`Language`, show.original_language),
            getDataItem(`Release`, DateHelper.getFullMessage(show.first_air_date)),
            getDataItem(`Status`, show.status),
        ]
    });

    public static getSeason = (season: SeasonWithEpisodesResponse): DetailInfoProps => ({
        data: [
            getDataItem(`Air date`, DateHelper.getFullMessage(season.air_date)),
            getDataItem(`Episodes`, `${season.episodes?.length}`),
        ]
    });

    public static getEpisode = (episode: EpisodeResponse): DetailInfoProps => ({
        data: [
            getDataItem(`Air date`, DateHelper.getFullMessage(episode.air_date)),
        ]
    });
}

export default DetailInfoHelper;