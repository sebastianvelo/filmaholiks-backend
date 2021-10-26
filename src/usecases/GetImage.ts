import { ImageProps } from "../endpoints/common/model/ImageProps";

const getImage = (src?: string | null, alt?: string): ImageProps => ({
    src: `https://image.tmdb.org/t/p/w200${src}`,
    alt: `${alt}`
})

export default getImage;