import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import ImageModel from "../../model/atom/ImageModel";

const getYoutubeLink = (id?: string) =>
  `https://www.youtube.com/embed/${id}`;

export const getTMDBImage = (src?: string | null, alt?: string): ImageModel => ({
  src: src ? `https://image.tmdb.org/t/p/w200${src}` : `https://www.linguaa.com/assets/dummy.gif`,
  alt: `${alt}`
});

export const getTrailer = (videos: VideosResponse) => ({
  title: "Trailer",
  src: getYoutubeLink(videos?.results![0]?.key)
});
