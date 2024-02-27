// config.js
const config = {
  development: {
    API_BASE_URL: "http://localhost:5000", // Set your local Flask server URL
    getAmazonAPI: (asin) => ({
      URL: `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
      HEADERS: {
        "X-RapidAPI-Key": "8c06cc9cd8msh1c331d6714e0d1fp13457ejsndc063bbdbc5e",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    }),
  },
};


export default config;
