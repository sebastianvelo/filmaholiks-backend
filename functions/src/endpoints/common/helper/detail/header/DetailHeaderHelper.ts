import { EpisodeResponse } from "tmdb-js/lib/api/request/episode/response/Response";
import { MovieResponse } from "tmdb-js/lib/api/request/movie/response/Response";
import { PersonDetailsResponse } from "tmdb-js/lib/api/request/person/response/Response";
import { SeasonWithEpisodesResponse } from "tmdb-js/lib/api/request/season/response/Response";
import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import { DetailHeaderProps } from "../../../../detail/model/DetailPageProps";

class DetailHeaderHelper {
    public static getMovieHeader = (movie: MovieResponse): DetailHeaderProps => ({
        title: `${movie.title}`
    });

    public static getPersonHeader = (person: PersonDetailsResponse): DetailHeaderProps => ({
        title: `${person.name}`,
    });

    public static getShowHeader = (shpw: TVShowResponse): DetailHeaderProps => ({
        title: `${shpw.original_name}`,
    });

    public static getSeasonHeader = (season: SeasonWithEpisodesResponse): DetailHeaderProps => ({
        title: `${season.name}`,
    });

    public static getEpisodeHeader = (episode: EpisodeResponse): DetailHeaderProps => ({
        title: `${episode.name} (${episode.season_number}x${episode.episode_number})`,
    })
}

export default DetailHeaderHelper;