import React, { useState, useEffect } from 'react';
import ProductsCard from '../components/ProductsCard';
import { useUserContext } from '../context/UserContext';
import config from '../../config';

function DashBoard() {
  const { userData } = useUserContext();
  const { interests } = userData;

  // State to store the fetched product IDs and details
  const [recommendedProductIds, setRecommendedProductIds] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when interests change
    setRecommendedProductIds([]);
    setRecommendedProducts([]);
    setLoading(true);
    setError(null);

    // Fetch Recommended Product IDs
    fetchProducts('/api/rank-based')
      .then((data) => {
        setRecommendedProductIds(data.recommendations);
        return Promise.all(data.recommendations.map(fetchAmazonDetails));
      })
      .then((details) => {
        setRecommendedProducts(details);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching recommended product IDs.');
        setLoading(false);
      });
  }, [interests]); // Include any dependencies that should trigger a re-fetch

  // Function to fetch data from the Flask API
  const fetchProducts = async (apiEndpoint) => {
    try {
      const response = await fetch(`${config.development.API_BASE_URL}${apiEndpoint}`);
      const data = await response.json();
      return data; // Assuming your API returns product IDs in a 'recommendations' key
    } catch (error) {
      console.error(`Error fetching recommended product IDs from ${apiEndpoint}:`, error);
      throw error;
    }
  };

  // Function to fetch Amazon details for a product ID
  const fetchAmazonDetails = async (productId) => {
    try {
      const response = await fetch(`${config.development.AMAZON_API.URL}${productId}`, {
        headers: config.development.AMAZON_API.HEADERS,
      });
      const data = await response.json();
      // Assuming your Amazon API returns product details in the response
      return data;
    } catch (error) {
      console.error(`Error fetching details for recommended product ID ${productId}:`, error);
      throw error;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ProductsCard title="Recommended Products" products={recommendedProducts} />
    </>
  );
}

export default DashBoard;
