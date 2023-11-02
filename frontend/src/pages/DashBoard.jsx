import React from 'react'
import ProductsCard from '../components/ProductsCard'

function DashBoard() {
    return (
        <>
            <ProductsCard title="Customers also purchased"/>
            <ProductsCard title="Highly Rated Products"/>
            <ProductsCard title="Recommended products"/>
        </>

    )
}

export default DashBoard