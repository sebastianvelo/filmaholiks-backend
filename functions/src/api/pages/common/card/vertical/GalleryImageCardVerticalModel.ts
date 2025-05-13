import { Image } from "tmdb-js/lib/api/model/image/Image";
import CardVerticalModel from "../@shared/model/components/CardVerticalModel";
import { getTMDBImage } from "../../../../helper/media/MediaHelper";

const GalleryImageCardVerticalModel = (image: Image): CardVerticalModel => ({
    image: getTMDBImage(image.file_path, image.id)
});

export default GalleryImageCardVerticalModel;