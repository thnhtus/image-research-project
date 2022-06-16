import {
  createSlice,
  createAsyncThunk,
  // PayloadAction,
  // CaseReducer,
} from '@reduxjs/toolkit';
import { Photo, ParamsProps, PhotoList } from '../models/model';
import unsplashService from '../services/unsplashService';

interface State {
  randomPhoto: Photo | undefined;
  searchResults: PhotoList;
  getRandomLoading: boolean;
  searchLoading: boolean;
}

const initialState: State = {
  randomPhoto: undefined,
  searchResults: {
    results: [],
    total: undefined,
    total_pages: undefined,
  },
  getRandomLoading: false,
  searchLoading: false,
};

const getRandomPhoto = createAsyncThunk('app/getRandomPhoto', async () => {
  const result = await unsplashService.getRandomPhoto();
  return result;
});

const searchPhotos = createAsyncThunk(
  'app/searchPhotos',
  async (params: ParamsProps) => {
    const result = await unsplashService.searchPhotos(params);
    return result;
  },
);

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get random photo
    builder.addCase(getRandomPhoto.pending, (state) => ({
      ...state,
      getRandomLoading: true,
    }));
    builder.addCase(getRandomPhoto.fulfilled, (state, { payload }) => ({
      ...state,
      randomPhoto: payload,
      getRandomLoading: false,
    }));
    builder.addCase(getRandomPhoto.rejected, (state) => ({
      ...state,
      getRandomLoading: false,
    }));
    // search photos
    builder.addCase(searchPhotos.pending, (state) => ({
      ...state,
      searchLoading: true,
    }));
    builder.addCase(searchPhotos.fulfilled, (state, { payload }) => ({
      ...state,
      searchResults: payload,
      searchLoading: false,
    }));
    builder.addCase(searchPhotos.rejected, (state) => ({
      ...state,
      searchLoading: false,
    }));
  },
});

export { getRandomPhoto, searchPhotos };

export default slice.reducer;
