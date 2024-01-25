// config.js
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000", // Set your local Flask server URL
    getAmazonAPI: (asin) => ({
      URL: `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
      HEADERS: {
        "X-RapidAPI-Key": "f489390ff5mshc723de7d80419bcp13317bjsndff690ffead6",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    }),
  },
};


export default config;
