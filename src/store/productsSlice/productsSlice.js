import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const response = await fetch(
      `http://localhost:3024/api/goods/?${params ? params : ""}`
    );
    const data = await response.json();
    const collection = new URLSearchParams(params).getAll("collection") || [];

    console.log("collection: ", collection);

    return {
      goods: data.goods, // Получаем данные из 'data.products'
      page: data.page, // Обращаемся к полям 'page' и 'pages' в `data`
      pages: data.pages,
      collection: collection,
    };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    page: 1,
    pages: null,
    collection: [],
    color: [],
    montages: [],
    minPrice: 0,
    maxPrice: 100000,
    error: null,
  },
  reducers: {
    toggleCollections: (state, action) => {
      if (state.collection.includes(action.payload)) {
        state.collection = state.collection.filter((f) => f !== action.payload);
      } else {
        state.collection.push(action.payload);
      }
    },
    toggleColors: (state, action) => {
      console.log(action);
      if (state.color.includes(action.payload)) {
        state.color = state.color.filter((f) => f !== action.payload);
      } else {
        state.color.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.goods;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.collection = action.payload.collection || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleCollections, toggleColors } = productsSlice.actions;

export default productsSlice.reducer;
