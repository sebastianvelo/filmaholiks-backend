class DataItemHelper {
  public static getDataItem = (title: string, description?: string | null) =>
    description && !description.includes("undefined") && !description.includes("null")
      ? {
        title,
        description
      }
      : undefined;
}

export default DataItemHelper;
