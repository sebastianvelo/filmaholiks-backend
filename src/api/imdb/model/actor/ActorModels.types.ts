import { Actor, Award, Film, Role } from "api/model/IMDbModels.types";

export type SearchByName = Actor[];
export interface ActorDetailById extends Actor {
    image_url: string;
    type: string;
    birth_date: string;
    birth_place: string;
    partial_bio: string;
    height: string;
    star_sign: string;
}
export type BioById = {
    biography: {
        bio: string;
        trademarks: string[];
        trivia: string[];
        quotes: string[];
        salary: {
            [film_title: string]: string;
        }
    }
}
export type RolesById = [Film, Role][];
export type AwardsById = Award[];