import { VideosResponse } from "tmdb-js/lib/api/common/response/CommonResponse";
import { ImageProps } from "../../model/ImageProps";

class MediaHelper {
  public static getImage = (src?: string | null, alt?: string): ImageProps => ({
    src: src ? `https://image.tmdb.org/t/p/w200${src}` : `https://www.linguaa.com/assets/dummy.gif`,
    alt: `${alt}`
  });

  public static getTrailer = (videos: VideosResponse) => ({
    title: "Trailer",
    src: MediaHelper.getYoutubeLink(videos?.results![0]?.key)
  });

  public static getYoutubeLink = (id?: string) =>
    `https://www.youtube.com/embed/${id}`;
}

export default MediaHelper;
