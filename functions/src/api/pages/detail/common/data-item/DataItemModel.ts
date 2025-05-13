import { DataItemSectionModel } from "../../../../../shared/model/components/section/Section";

const DataItemModel = (title: string, description?: string | null): DataItemSectionModel | undefined =>
  description && !description.includes("undefined") && !description.includes("null") ?
    { title, description } :
    undefined;
    
export default DataItemModel;