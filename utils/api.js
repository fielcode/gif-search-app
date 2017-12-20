import config from "../config.json";

export const searchGifs = async (q, offset = 0, limit = 27) => {
  try {
    q = q.replace(/\s/g, "+");
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        config.giphy_api_key
      }&q=${q}&limit=${limit}&offset=${offset}`
    );
    return await response.json();
  } catch (e) {
    return {
      data: []
    };
  }
};

export const trendingGifs = async (limit = 27) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${
        config.giphy_api_key
      }&limit=${limit}`
    );
    return await response.json();
  } catch (e) {
    return {
      data: []
    };
  }
};
