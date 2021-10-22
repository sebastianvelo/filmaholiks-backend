import { DetailById } from "../FilmModelstypes";

export interface SeriesDetailById extends DetailById {
    start_year: number;
    end_year: number;    
}