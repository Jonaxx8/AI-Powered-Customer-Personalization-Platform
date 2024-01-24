import React, { useState, useEffect } from 'react';
import ProductsCard from '../components/ProductsCard';
import { useUserContext } from '../context/UserContext';
import config from '../../config';

function DashBoard() {
  const { userData } = useUserContext();
  const { interests } = userData;

  // State for recommended products
  const [recommendedProductIds, setRecommendedProductIds] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // State for highly rated products
  const [highlyRatedProductIds, setHighlyRatedProductIds] = useState([]);
  const [highlyRatedProducts, setHighlyRatedProducts] = useState([]);

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when interests change
    setRecommendedProductIds([]);
    setRecommendedProducts([]);
    setHighlyRatedProductIds([]);
    setHighlyRatedProducts([]);
    setLoading(true);
    setError(null);

    // Fetch both Recommended and Highly Rated Product IDs concurrently
    Promise.all([
      fetchProducts('/api/rank-based'),
      fetchProducts('/api/user-based')
    ])
      .then(([recommendedData, highlyRatedData]) => {
        setRecommendedProductIds(recommendedData.recommendations);
        setHighlyRatedProductIds(highlyRatedData.recommendations);

        const recommendedDetailsPromise = Promise.all(recommendedData.recommendations.map(fetchAmazonDetails));
        const highlyRatedDetailsPromise = Promise.all(highlyRatedData.recommendations.map(fetchAmazonDetails));

        return Promise.all([recommendedDetailsPromise, highlyRatedDetailsPromise]);
      })
      .then(([recommendedDetails, highlyRatedDetails]) => {
        setRecommendedProducts(recommendedDetails);
        setHighlyRatedProducts(highlyRatedDetails);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching product data.');
        setLoading(false);
      });
  }, [interests]);

  // Function to fetch data from the Flask API
  const fetchProducts = async (apiEndpoint) => {
    try {
      const response = await fetch(`${config.development.API_BASE_URL}${apiEndpoint}`);
      const data = await response.json();
      return data; // Assuming your API returns product IDs in a 'recommendations' key
    } catch (error) {
      console.error(`Error fetching product IDs from ${apiEndpoint}:`, error);
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
      console.error(`Error fetching details for product ID ${productId}:`, error);
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
      <ProductsCard title="Highly Rated Products" products={highlyRatedProducts} />
    </>
  );
}

export default DashBoard;
