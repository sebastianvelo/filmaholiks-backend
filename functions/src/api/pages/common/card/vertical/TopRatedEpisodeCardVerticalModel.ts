import { Episode } from "tmdb-js/lib/api/model/episode/Episode";
import CardVerticalModel from "@shared/model/components/CardVerticalModel";
import { PageRouteBuilder } from "@shared/routes/PageRoute";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const TopRatedEpisodeCardVerticalModel = (episode: Episode, show?: number): CardVerticalModel => ({
    title: `${episode.name} (${episode.season_number}x${episode.episode_number})`,
    subtitle: `${episode.vote_average}/10`,
    image: getTMDBImage(episode.still_path, episode.name),
    path: PageRouteBuilder.EPISODE_DETAIL(show!, episode.season_number!, episode.episode_number!)
});

export default TopRatedEpisodeCardVerticalModel;