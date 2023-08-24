import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      filtered_Products: [...action.payload],
      all_Products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_View: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_View: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_Products } = state;
    let temp_Products = filtered_Products;
    if (sort === "price-lowest") {
      temp_Products = temp_Products.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      temp_Products = temp_Products.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      temp_Products = temp_Products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === "name-z") {
      temp_Products = temp_Products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return { ...state, temp_Products };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  //Filtering
  if (action.type === FILTER_PRODUCTS) {
    const { all_Products } = state;
    const { text, company, category, color, price, shipping } = state.filters;

    let temp_Products = all_Products;
    //text filter
    if (text) {
      temp_Products = temp_Products.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    //category filter
    if (category !== "all") {
      temp_Products = temp_Products.filter(
        (product) => product.category === category
      );
    }
    //company
    if (company !== "all") {
      temp_Products = temp_Products.filter(
        (product) => product.company === company
      );
    }
    //color
    if (color !== "all") {
      temp_Products = temp_Products.filter((product) =>
        product.colors.find((c) => c === color)
      );
    }
    //price
    if (price) {
      temp_Products = temp_Products.filter((product) => product.price <= price);
    }
    //shipping
    if (shipping) {
      temp_Products = temp_Products.filter(
        (product) => product.shipping === true
      );
    }
    return { ...state, filtered_Products: temp_Products };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
