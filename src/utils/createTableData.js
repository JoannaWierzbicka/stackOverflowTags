import loadData from "./api";

export const createTableData = async () => {
  try {
    const tableItems = await loadData();
    return tableItems.map((item) => ({
      name: item.name,
      count: item.count,
    }));
  } catch (error) {
    console.error("Error fetching table data:", error);
    return [];
  }
};

export default createTableData;
