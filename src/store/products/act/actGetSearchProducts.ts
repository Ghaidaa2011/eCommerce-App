import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosErrorHandler } from "@utils";
import { TProduct } from "@types";

type TResponse = TProduct[];

const actGetSearchProducts = createAsyncThunk(
  "products/actGetSearchProducts",
  async (title: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const { data } = await axios.get<TResponse>(
        `/products?title_like=${title}`, { signal }
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetSearchProducts;