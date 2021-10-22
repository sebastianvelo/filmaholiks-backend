import { Paginable } from "../../../common/Params";
import { ActorDetailById, AwardsById, BioById, RolesById, SearchByName } from "../../model/actor/ActorModels.types";
import IMDbRequest from "../IMDbRequest";

class ActorRequest extends IMDbRequest {
    protected collection: string = '/actor';

    public searchByName = (name: string) => this.get<SearchByName>(`/imdb_id_byName/${name}/`);
    public detailById = (id: string) => this.get<ActorDetailById>(`/id/${id}/`);
    public bioById = (id: string) => this.get<BioById>(`/id/${id}/bio/`);
    public allRolesById = (id: string, params: Paginable) => this.get<RolesById>(`/id/${id}/all_roles/`, params);
    public awardsById = (id: string, params: Paginable) => this.get<AwardsById>(`/id/${id}/awards/`, params);
};

export default new ActorRequest();