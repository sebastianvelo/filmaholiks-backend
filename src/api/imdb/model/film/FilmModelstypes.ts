import { Film, Genre, Role, Award } from "../IMDbModels.types";

export type SearchFilm = Film[];
export interface DetailById extends Film {
    popularity: number;
    description: string;
    content_rating: string;
    movie_length: number;
    rating: number;
    created_at: string;
    trailer: string;
    image_url: string;
    release: string;
    plot: string;
    banner: string;
    type: string;
    more_like_this: Film[];
    gen: Genre[];
};
export type CastById = {
    roles: Role[];   
};
export type AwardsById = Award[];

interface UpcomingFilm extends Film {
    release: string;
}
export type Upcoming = UpcomingFilm[];

interface PopularFilm extends Film {
    popularity: number;
}
export type Popular = PopularFilm[];

interface BestFilm extends Film {
    rating: number;
}
export type Best = BestFilm[];