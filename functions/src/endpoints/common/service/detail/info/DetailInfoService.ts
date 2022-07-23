import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailInfoProps } from "../../../../detail/model/DetailPageProps";
import DataItemService from "../../data-item/DataItemService";

//TODO Hacer dateservice
const getDate = (date?: string | null, locale?: string) =>
    date && Intl.DateTimeFormat(locale ?? 'en-US', { year: 'numeric', day: 'numeric', month: 'long' }).format(new Date(date));

class DetailInfoService {

    public static getShowInfo = (tv: TVShowResponse): DetailInfoProps => ({
        data: [
            DataItemService.getDataItem(
                `Genres`,
                tv.genres?.map((genre) => genre.name).join(", ")
            ),
            DataItemService.getDataItem(`Language`, tv.original_language),
            DataItemService.getDataItem(`Release`, getDate(tv.first_air_date)),
            DataItemService.getDataItem(`Status`, tv.status),
        ]
    });
    ;
    public static getMovieInfo = (movie: MovieResponse): DetailInfoProps => ({
        data: [
            DataItemService.getDataItem(
                `Genres`,
                movie.genres?.map((genre) => genre.name).join(", ")
            ),
            DataItemService.getDataItem(`Duration`, `${movie.runtime}m`),
            DataItemService.getDataItem(`Language`, movie.original_language),
            DataItemService.getDataItem(`Release`, getDate(movie.release_date)),
            DataItemService.getDataItem(`Budget`, `$${movie.budget}`),
            DataItemService.getDataItem(`Revenue`, `$${movie.revenue}`),
            DataItemService.getDataItem(`Status`, movie.status),
        ]
    });

    public static getPersonInfo = (person: PersonDetailsResponse): DetailInfoProps => ({
        data: [
            DataItemService.getDataItem(`Birthday`, getDate(person.birthday)),
            DataItemService.getDataItem(`Deathday`, getDate(person.deathday)),
            DataItemService.getDataItem(`Place of birth`, person.place_of_birth),
            DataItemService.getDataItem(`Known for`, person.known_for_department),
        ]
    });

    public static getSeasonInfo = (season: SeasonWithEpisodesResponse): DetailInfoProps => ({
        data: [
            DataItemService.getDataItem(`Air date`, getDate(season.air_date)),
            DataItemService.getDataItem(`Episodes`, `${season.episodes?.length}`),
        ]
    });

    public static getEpisodeInfo = (episode: EpisodeResponse): DetailInfoProps => ({
        data: [
            DataItemService.getDataItem(`Air date`, getDate(episode.air_date)),
        ]
    });
}

export default DetailInfoService;