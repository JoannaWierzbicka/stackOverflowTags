const apiURL =
  "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow";

export const makeRequest = async () => {
  const response = await fetch(apiURL);
  const data = await response.json();
  if (!response.ok) {
    throw {
      data,
      code: response.status,
    };
  }
  return data.items;
};

export default makeRequest;
