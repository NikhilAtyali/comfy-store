import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_Products : products, grid_View} = useFilterContext()
  if(products?.length < 1){
    return <h5 style={{textTransform: 'none'}}>Sorry, There are no products to display...</h5>
  }
  if(grid_View === false){
    return <ListView products={products} >List View</ListView>
  }
  return <GridView products={products}>Product List</GridView>
}

export default ProductList
