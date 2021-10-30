import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import getYoutubeLink from "./GetYoutubeLink";

const getTrailer = (videos: VideosResponse) => ({
  title: "Trailer",
  src: getYoutubeLink(videos?.results![0]?.key)
});

export default getTrailer;
