import queryString from 'query-string';
import { GymInterface, GymGetQueryInterface } from 'interfaces/gym';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGyms = async (query?: GymGetQueryInterface): Promise<PaginatedInterface<GymInterface>> => {
  return fetcher('/api/gyms', {}, query);
};

export const createGym = async (gym: GymInterface) => {
  return fetcher('/api/gyms', { method: 'POST', body: JSON.stringify(gym) });
};

export const updateGymById = async (id: string, gym: GymInterface) => {
  return fetcher(`/api/gyms/${id}`, { method: 'PUT', body: JSON.stringify(gym) });
};

export const getGymById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/gyms/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteGymById = async (id: string) => {
  return fetcher(`/api/gyms/${id}`, { method: 'DELETE' });
};
