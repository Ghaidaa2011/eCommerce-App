import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import actGetAllProducts from "./act/actGetAllProducts";
import { TProduct, TLoading, isString } from "@types";

interface ICategoriesState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
  page: number;
  order: "asc" | "desc" | null;
  sortBy: string;
  prefix: string;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
  page: 1,
  order: null,
  sortBy: "",
  prefix: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProductsRecords: (state) => {
      state.records = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPrefix: (state, action) => {
      state.prefix = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GetProductsByCatPrefix
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    //GetAllProducts
    builder.addCase(actGetAllProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetAllProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetAllProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { cleanUpProductsRecords, setOrder, setPage, setSortBy, setPrefix } = productsSlice.actions;
export { actGetProductsByCatPrefix, actGetAllProducts };
export default productsSlice.reducer;