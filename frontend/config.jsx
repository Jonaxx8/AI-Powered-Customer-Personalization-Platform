// config.js
const config = {
    development: {
        API_BASE_URL: 'http://localhost:5000', // Set your local Flask server URL
        AMAZON_API: {
          URL: 'https://amazon-product-search2.p.rapidapi.com/product/?asin=',
          HEADERS: {
            // 'X-RapidAPI-Key': 'b6edc7548cmsh2c912ce4f2514b4p1bf551jsn0c1adf5163c9',
            'X-RapidAPI-Key': 'f75faab58amshd375c022d9e76bbp1e68cbjsn4053b77611c5',
            'X-RapidAPI-Host': 'amazon-product-search2.p.rapidapi.com',
          },
        },
      },
  };
  
  export default config;
  