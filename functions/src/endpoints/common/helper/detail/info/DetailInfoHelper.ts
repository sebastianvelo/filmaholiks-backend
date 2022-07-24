import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailInfoProps } from "../../../../detail/model/DetailPageProps";
import DataItemHelper from "../../data-item/DataItemHelper";
import DateHelper from "../../date/DateHelper";

class DetailInfoHelper {

    public static getShowInfo = (show: TVShowResponse): DetailInfoProps => ({
        data: [
            DataItemHelper.getDataItem(
                `Genres`,
                show.genres?.map((genre) => genre.name).join(", ")
            ),
            DataItemHelper.getDataItem(`Language`, show.original_language),
            DataItemHelper.getDataItem(`Release`, DateHelper.getFullMessage(show.first_air_date)),
            DataItemHelper.getDataItem(`Status`, show.status),
        ]
    });

    public static getMovieInfo = (movie: MovieResponse): DetailInfoProps => ({
        data: [
            DataItemHelper.getDataItem(
                `Genres`,
                movie.genres?.map((genre) => genre.name).join(", ")
            ),
            DataItemHelper.getDataItem(`Duration`, `${movie.runtime}m`),
            DataItemHelper.getDataItem(`Language`, movie.original_language),
            DataItemHelper.getDataItem(`Release`, DateHelper.getFullMessage(movie.release_date)),
            DataItemHelper.getDataItem(`Budget`, `$${movie.budget}`),
            DataItemHelper.getDataItem(`Revenue`, `$${movie.revenue}`),
            DataItemHelper.getDataItem(`Status`, movie.status),
        ]
    });

    public static getPersonInfo = (person: PersonDetailsResponse): DetailInfoProps => ({
        data: [
            DataItemHelper.getDataItem(`Birthday`, person.deathday ? DateHelper.getFullMessage(person.birthday, person.deathday) : DateHelper.getFullMessage(person.birthday)),
            DataItemHelper.getDataItem(`Deathday`, person.deathday ? DateHelper.getFullMessage(person.deathday) : undefined),
            DataItemHelper.getDataItem(`Place of birth`, person.place_of_birth),
            DataItemHelper.getDataItem(`Known for`, person.known_for_department),
        ]
    });

    public static getSeasonInfo = (season: SeasonWithEpisodesResponse): DetailInfoProps => ({
        data: [
            DataItemHelper.getDataItem(`Air date`, DateHelper.getFullMessage(season.air_date)),
            DataItemHelper.getDataItem(`Episodes`, `${season.episodes?.length}`),
        ]
    });

    public static getEpisodeInfo = (episode: EpisodeResponse): DetailInfoProps => ({
        data: [
            DataItemHelper.getDataItem(`Air date`, DateHelper.getFullMessage(episode.air_date)),
        ]
    });
}

export default DetailInfoHelper;