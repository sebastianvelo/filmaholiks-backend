import { Paginable } from "../../../../common/Params";
import { AwardsById } from "../../../model/actor/ActorModels.types";
import { Best, CastById, Popular, SearchFilm, Upcoming } from "../../../model/film/FilmModelstypes";
import { SeriesDetailById } from "../../../model/film/series/SeriesModels.types";
import IMDbRequest from "../../IMDbRequest";

class SeriesRequest extends IMDbRequest {
    protected collection: string = '/series';

    public searchByTitle = (title: string) => this.get<SearchFilm>(`/idbyTitle/${title}/`);
    public searchByStartYear = (year: number, params: Paginable) => this.get<SearchFilm>(`/byYear/${year}/`, params);
    public searchByGenre = (genre: string, params: Paginable) => this.get<SearchFilm>(`/byGen/${genre}/`, params);
    public detailById = (id: string) => this.get<SeriesDetailById>(`/id/${id}/`);
    public castById = (id: string) => this.get<CastById>(`/id/${id}/cast/`);
    public awardsById = (id: string, params: Paginable) => this.get<AwardsById>(`/id/${id}/awards/`, params);
    public upcoming = (params: Paginable) => this.get<Upcoming>(`/order/upcoming/`, params);
    public best = (params: Paginable) => this.get<Best>(`/order/byRating/`, params);
    public popular = (params: Paginable) => this.get<Popular>(`/order/byPopularity/`, params);
};

export default new SeriesRequest();