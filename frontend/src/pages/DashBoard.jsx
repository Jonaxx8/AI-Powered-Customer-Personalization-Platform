import React, { useState, useEffect } from 'react';
import ProductsCard from '../components/ProductsCard.jsx';
import { useSelector } from 'react-redux';
import { ProductsByRank, ProductsBySimilarity, ProductsByModel } from '../data/data.js';
import { PropagateLoader } from 'react-spinners';

const DashBoard = () => {
  const productsRank = ProductsByRank;
  const [ProductsSection1, setProductsSection1] = useState([]);
  const [ProductsSection2, setProductsSection2] = useState([]);
  const [ProductsSection3, setProductsSection3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { age, interest } = useSelector((state) => state.userPreferences);

  useEffect(() => {
    setIsLoading(true); 
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    if (age === '18-25' && interest === 'electronics') {
      setProductsSection1(productsRank.filter(product => product.age === '18-25' && product.interest === 'electronics'));
    } else if (age === '26-35' && interest === 'electronics') {
      setProductsSection1(productsRank.filter(product => product.age === '26-35' && product.interest === 'electronics'));
    } else if (age === '36-50' && interest === 'electronics') {
      setProductsSection1(productsRank.filter(product => product.age === '36-50' && product.interest === 'electronics'));
    } else if (age === '18-25' && interest === 'books') {
      setProductsSection1(productsRank.filter(product => product.age === '18-25' && product.interest === 'books'));
    } else if (age === '36-50' && interest === 'books') {
      setProductsSection1(productsRank.filter(product => product.age === '36-50' && product.interest === 'books'));
    } else if (age === '26-35' && interest === 'books') {
      setProductsSection1(productsRank.filter(product => product.age === '26-35' && product.interest === 'books'));
    } else if (age === '18-25' && interest === 'beauty') {
      setProductsSection1(productsRank.filter(product => product.age === '18-25' && product.interest === 'beauty'));
    } else if (age === '36-50' && interest === 'beauty') {
      setProductsSection1(productsRank.filter(product => product.age === '36-50' && product.interest === 'beauty'));
    } else if (age === '26-35' && interest === 'beauty') {
      setProductsSection1(productsRank.filter(product => product.age === '26-35' && product.interest === 'beauty'));
    } else {
      setProductsSection1(productsRank);
    }

    return () => clearTimeout(timeout); 
  }, [age, interest]);

  useEffect(() => {
    setIsLoading(true); 
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    if (age === '18-25' && interest === 'electronics') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '18-25' && product.interest === 'electronics'));
    } else if (age === '26-35' && interest === 'electronics') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '26-35' && product.interest === 'electronics'));
    } else if (age === '36-50' && interest === 'electronics') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '36-50' && product.interest === 'electronics'));
    } else if (age === '18-25' && interest === 'books') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '18-25' && product.interest === 'books'));
    } else if (age === '36-50' && interest === 'books') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '36-50' && product.interest === 'books'));
    } else if (age === '26-35' && interest === 'books') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '26-35' && product.interest === 'books'));
    } else if (age === '18-25' && interest === 'beauty') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '18-25' && product.interest === 'beauty'));
    } else if (age === '36-50' && interest === 'beauty') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '36-50' && product.interest === 'beauty'));
    } else if (age === '26-35' && interest === 'beauty') {
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '26-35' && product.interest === 'beauty'));
    } else {
      setProductsSection2(ProductsBySimilarity);
    }

    return () => clearTimeout(timeout); 
  }, [age, interest]);

  useEffect(() => {
    setIsLoading(true); 
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    if (age === '18-25' && interest === 'electronics') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '18-25' && product.interest === 'electronics'));
    } else if (age === '26-35' && interest === 'electronics') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '26-35' && product.interest === 'electronics'));
    } else if (age === '36-50' && interest === 'electronics') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '36-50' && product.interest === 'electronics'));
    } else if (age === '18-25' && interest === 'books') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '18-25' && product.interest === 'books'));
    } else if (age === '36-50' && interest === 'books') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '36-50' && product.interest === 'books'));
    } else if (age === '26-35' && interest === 'books') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '26-35' && product.interest === 'books'));
    } else if (age === '18-25' && interest === 'beauty') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '18-25' && product.interest === 'beauty'));
    } else if (age === '36-50' && interest === 'beauty') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '36-50' && product.interest === 'beauty'));
    } else if (age === '26-35' && interest === 'beauty') {
      setProductsSection3(ProductsByModel.filter(product => product.age === '26-35' && product.interest === 'beauty'));
    } else {
      setProductsSection3(ProductsByModel);
    }

    return () => clearTimeout(timeout); 
  }, [age, interest]);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <PropagateLoader color={'#3949AB'} loading={isLoading} size={15} />
        </div>
      ) : (
        <>
          <ProductsCard title="Highly Rated Products" products={ProductsSection1} />
          <ProductsCard title="Similarity Based Products" products={ProductsSection2} />
          <ProductsCard title="Model Based Products" products={ProductsSection3} />
        </>
      )}
    </div>
  );
};

export default DashBoard;
