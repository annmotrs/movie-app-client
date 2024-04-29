import { $authHost } from './index.js';

export const addFavorite = async (userId, movieId) => {
  const { data } = await $authHost.post('api/favorite/', { userId, movieId });
  return data;
};

export const getFavorites = async (userId) => {
  const { data } = await $authHost.get(`api/favorite?id=${userId}`);
  return data;
};

export const deleteFavorite = async (id) => {
  const { data } = await $authHost.delete('api/favorite/' + id);
  return data;
};
