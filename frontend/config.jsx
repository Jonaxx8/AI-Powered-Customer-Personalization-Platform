// config.js
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000", // Set your local Flask server URL
    getAmazonAPI: (asin) => ({
      URL: `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
      HEADERS: {
        "X-RapidAPI-Key": "1ddd8120ffmsh57168c433108bccp15b248jsnd8185254fa2a",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    }),
  },
};


export default config;
