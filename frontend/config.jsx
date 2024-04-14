// config.js
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000", // Set your local Flask server URL
    getAmazonAPI: (asin) => ({
      URL: `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
      HEADERS: {
        "X-RapidAPI-Key": "4adfc7aeecmsh741a767317d4f48p16541ajsn7f157dcc48e9",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    }),
  },
};


export default config;
