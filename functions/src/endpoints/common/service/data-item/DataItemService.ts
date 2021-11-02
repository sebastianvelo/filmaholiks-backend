class DataItemService {
  public static getDataItem = (title: string, description?: string) =>
    description
      ? {
          title,
          description: description ?? ""
        }
      : undefined;
}

export default DataItemService;
