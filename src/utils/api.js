const apiURL =
  "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow";

export const makeRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw {
      data,
      code: response.status,
    };
  }
  return data.items;
};

export const loadData = () => {
  return makeRequest(apiURL)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error)
    });
};

export default loadData;
