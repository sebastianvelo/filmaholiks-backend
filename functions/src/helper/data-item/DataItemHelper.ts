import { DataItemProps } from "../../endpoints/detail/model/DetailPageProps";

const getDataItem = (title: string, description?: string | null): DataItemProps | undefined =>
  description && !description.includes("undefined") && !description.includes("null") ?
    { title, description } :
    undefined;
    
export default getDataItem;