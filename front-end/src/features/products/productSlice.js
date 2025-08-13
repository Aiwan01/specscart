import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ( _, { getState, rejectWithValue }) => {

    try {
      const { search, filters, sortBy, order, page } = getState().products;
      const params = {
        search,
        sortBy,
        order,
        page,
        limit: 24,
      };

      // Only add filter parameters if they have values
      if (filters.category.length > 0) {
        params.category = filters.category.join(",");
      }
      if (filters.brand.length > 0) {
        params.brand = filters.brand.join(",");
      }
      if (filters.color.length > 0) {
        params.color = filters.color.join(",");
      }
      if (filters.price[0] > 0 || filters.price[1] < 10000) {
        params.price_min = filters.price[0];
        params.price_max = filters.price[1];
      }

      console.log('API Parameters:', params);
      const response = await axios.get(API_URL+'/get-product-list', { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response.data);
    }
  });

 

const initialState = {
  productList: [],
  categories: [],
  brands: [],
  colors: [],
  search: '',
  page: 1,
  totalPages: 1,
  sortBy: 'price',
  order: 'asc',
  loading: false,
  error: null,
  success: false,
  filters: {
    category: [],
    brand: [],
    color: [],
    price: [0, 10000],
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  loading: false,

  reducers: {

    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setPriceRange(state, action) {
      state.filters.price = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSort(state, action) {
      // Parse the combined sort value into sortBy and order
      const [field, direction] = action.payload.split('_');
      state.sortBy = field;
      state.order = direction;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCategoryFilter(state, action) {
      const category = action.payload;
      const index = state.filters.category.indexOf(category);
      if (index > -1) {
        state.filters.category.splice(index, 1);
      } else {
        state.filters.category.push(category);
      }
      state.page = 1;
    },
    setBrandFilter(state, action) {
      const brand = action.payload;
      const index = state.filters.brand.indexOf(brand);
      if (index > -1) {
        state.filters.brand.splice(index, 1);
      } else {
        state.filters.brand.push(brand);
      }
      state.page = 1;
    },
    setColorFilter(state, action) {
      const color = action.payload;
      const index = state.filters.color.indexOf(color);
      if (index > -1) {
        state.filters.color.splice(index, 1);
      } else {
        state.filters.color.push(color);
      }
      state.page = 1;
    },
    clearFilters(state, actions) {
      const type = actions.payload;
      if (type) {
        state.filters[type] = [];
      } else {
        state.filters = {
          category: [],
          brand: [],
          color: [],
          price: [0, 10000],
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
      .addCase(fetchProducts.fulfilled, (state, action) => {

        state.categories = action.payload.filters.categories;
        state.brands = action.payload.filters.brands;
        state.colors = action.payload.filters.colors;

        state.productList = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

  }

});


export const { setSearch, setPriceRange, setCategoryFilter, setBrandFilter, setColorFilter, clearFilters, setSort, setSortBy, setOrder, setPage } = productSlice.actions;
export default productSlice.reducer;
