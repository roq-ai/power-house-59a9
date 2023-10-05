import queryString from 'query-string';
import { NutritionistInterface, NutritionistGetQueryInterface } from 'interfaces/nutritionist';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNutritionists = async (
  query?: NutritionistGetQueryInterface,
): Promise<PaginatedInterface<NutritionistInterface>> => {
  return fetcher('/api/nutritionists', {}, query);
};

export const createNutritionist = async (nutritionist: NutritionistInterface) => {
  return fetcher('/api/nutritionists', { method: 'POST', body: JSON.stringify(nutritionist) });
};

export const updateNutritionistById = async (id: string, nutritionist: NutritionistInterface) => {
  return fetcher(`/api/nutritionists/${id}`, { method: 'PUT', body: JSON.stringify(nutritionist) });
};

export const getNutritionistById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/nutritionists/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteNutritionistById = async (id: string) => {
  return fetcher(`/api/nutritionists/${id}`, { method: 'DELETE' });
};
