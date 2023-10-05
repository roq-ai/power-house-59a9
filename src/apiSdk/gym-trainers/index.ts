import queryString from 'query-string';
import { GymTrainerInterface, GymTrainerGetQueryInterface } from 'interfaces/gym-trainer';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGymTrainers = async (
  query?: GymTrainerGetQueryInterface,
): Promise<PaginatedInterface<GymTrainerInterface>> => {
  return fetcher('/api/gym-trainers', {}, query);
};

export const createGymTrainer = async (gymTrainer: GymTrainerInterface) => {
  return fetcher('/api/gym-trainers', { method: 'POST', body: JSON.stringify(gymTrainer) });
};

export const updateGymTrainerById = async (id: string, gymTrainer: GymTrainerInterface) => {
  return fetcher(`/api/gym-trainers/${id}`, { method: 'PUT', body: JSON.stringify(gymTrainer) });
};

export const getGymTrainerById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/gym-trainers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteGymTrainerById = async (id: string) => {
  return fetcher(`/api/gym-trainers/${id}`, { method: 'DELETE' });
};
