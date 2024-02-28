// config.js
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000", // Set your local Flask server URL
    getAmazonAPI: (asin) => ({
      URL: `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
      HEADERS: {
        "X-RapidAPI-Key": "6abab680f9msh85cc190bbfd26b7p1bbaa8jsn9bb3b5b45ddd",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    }),
  },
};


export default config;
