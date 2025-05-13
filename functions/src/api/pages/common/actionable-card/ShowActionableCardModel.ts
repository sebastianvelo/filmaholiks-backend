import { TVShowResponse } from "tmdb-js/lib/api/request/tv-show/response/Response";
import ActionableCardModel from "../../../../shared/model/components/ActionableCardModel";
import ShowCardHorizontalModel from "../card/horizontal/ShowCardHorizontalModel";

const ShowActionableCardModel = (show: TVShowResponse, del: boolean): ActionableCardModel => ({
    item: ShowCardHorizontalModel(show),
    delete: del
  });

export default ShowActionableCardModel;