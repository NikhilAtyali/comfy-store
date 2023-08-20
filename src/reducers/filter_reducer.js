import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return { ...state, filtered_Products: [...action.payload], all_Products: [...action.payload] }
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_View: true}
  }
  if( action.type === SET_LISTVIEW){
    return {...state, grid_View: false}
  }
  if (action.type === UPDATE_SORT){
    return {...state, sort: action.payload}
  }
  if(action.type === SORT_PRODUCTS){
    const {sort, filtered_Products} = state;
    let temp_Products = filtered_Products;
    if (sort === "price-lowest"){
      temp_Products = temp_Products.sort((a,b)=>a.price - b.price)
      console.log (sort, 'price-lowest')
    }
    if (sort === "price-highest"){
      temp_Products = temp_Products.sort((a,b)=>b.price - a.price)
      console.log (sort, 'price-highest')
    }
    if (sort === "name-a"){
      temp_Products = temp_Products.sort((a,b)=>a.name.localeCompare(b.name))
      console.log (sort, 'name-a')
    }
    if (sort === "name-z"){
      temp_Products = temp_Products.sort((a,b)=>b.name.localeCompare(a.name))
      console.log (sort, 'name-z')
    }
    return {...state, temp_Products}
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
