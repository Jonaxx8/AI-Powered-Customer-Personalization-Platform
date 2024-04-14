import React, {useState , useEffect} from 'react'
import ProductsCard from '../components/ProductsCard';
import { useSelector } from 'react-redux';
import {ProductsByRank , ProductsBySimilarity, ProductsByModel} from '../data/data';

const DashBoard = () => {
  const productsRank =  ProductsByRank;
  const [ProductsSection1, setProductsSection1] = useState([]);
  const [ProductsSection2, setProductsSection2] = useState([]);
  const [ProductsSection3, setProductsSection3] = useState([]);

  const { age, interest } = useSelector((state) => state.userPreferences);

  useEffect(() => {
    if(age==='18-25' && interest==='electronics'){
      setProductsSection1(productsRank.filter(product => product.age === '18-25' && product.interest === 'electronics'));
    }else if(age==='26-35' && interest==='electronics'){
      setProductsSection1(productsRank.filter(product => product.age === '26-35' && product.interest === 'electronics'));
    }else if(age==='36-50' && interest==='electronics'){
      setProductsSection1(productsRank.filter(product => product.age === '36-50' && product.interest === 'electronics'));
    }
  }, [age, interest]);

  useEffect(() => {
    if(age==='18-25' && interest==='electronics'){
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '18-25' && product.interest === 'electronics'));
    }else if(age==='26-35' && interest==='electronics'){
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '26-35' && product.interest === 'electronics'));
    }else if(age==='36-50' && interest==='electronics'){
      setProductsSection2(ProductsBySimilarity.filter(product => product.age === '36-50' && product.interest === 'electronics'));
    }
  }, [age, interest]);

  useEffect(() => {
    if(age==='18-25' && interest==='electronics'){
      setProductsSection3(ProductsByModel.filter(product => product.age === '18-25' && product.interest === 'electronics'));
    }else if(age==='26-35' && interest==='electronics'){
      setProductsSection3(ProductsByModel.filter(product => product.age === '26-35' && product.interest === 'electronics'));
    }else if(age==='36-50' && interest==='electronics'){
      setProductsSection3(ProductsByModel.filter(product => product.age === '36-50' && product.interest === 'electronics'));
    }
  }, [age, interest]);

  return (
    <div>
      <>
        <ProductsCard title="Highly Rated Products" products={ProductsSection1} />
        <ProductsCard title="Similarity Based Products" products={ProductsSection2} />
        <ProductsCard title="Model Based Products" products={ProductsSection3} />
      </>
    </div>
  )
}

export default DashBoard