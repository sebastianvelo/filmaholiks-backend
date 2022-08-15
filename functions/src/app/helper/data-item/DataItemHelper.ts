import { DataItemSectionModel } from "../../model/components/section/Section";

const getDataItem = (title: string, description?: string | null): DataItemSectionModel | undefined =>
  description && !description.includes("undefined") && !description.includes("null") ?
    { title, description } :
    undefined;
    
export default getDataItem;