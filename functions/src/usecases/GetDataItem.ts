const getDataItem = (title: string, description?: string) => ({
  title,
  description: description ?? ""
});

export default getDataItem;
