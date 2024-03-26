import makeRequest from "./api";

export const createTableData = async () => {
  const tableItems = await makeRequest();
  
  return tableItems.map((item) => ({
    name: item.name,
    count: item.count,
  }));
};

export default createTableData;
