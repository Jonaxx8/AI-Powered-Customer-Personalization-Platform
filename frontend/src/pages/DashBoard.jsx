import React from 'react'
import ProductsCard from '../components/ProductsCard'
import { useUserContext } from '../context/UserContext';

function DashBoard() {
    const { userData } = useUserContext();
    const { interests } = userData;
    console.log(interests, 'from dashboard');
    return (
        <>
            <ProductsCard title="Customers also purchased"/>
            <ProductsCard title="Highly Rated Products"/>
            <ProductsCard title="Recommended products"/>
        </>

    )
}

export default DashBoard