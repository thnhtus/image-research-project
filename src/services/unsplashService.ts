import { createApi } from 'unsplash-js';
import { Photo, ParamsProps, PhotoList } from '../models/model';

const ACCESS_KEY = 'Z0wtHk9737mMeb16-a-cT8p2XMv-rfr8H3J1p0X1P-I';

const unsplashAPI = createApi({
  accessKey: ACCESS_KEY,
});

const getRandomPhoto = async (): Promise<Photo> => {
  const result = await unsplashAPI.photos.getRandom({
    orientation: 'landscape',
  });
  return result.response as Photo;
};

const searchPhotos = async (params: ParamsProps): Promise<PhotoList> => {
  const result = await unsplashAPI.search.getPhotos({
    query: params.query,
    page: params.page,
    perPage: params.perPage,
  });
  return result.response as PhotoList;
};

const unsplashService = {
  getRandomPhoto,
  searchPhotos,
};

export default unsplashService;
