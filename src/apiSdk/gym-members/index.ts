import queryString from 'query-string';
import { GymMemberInterface, GymMemberGetQueryInterface } from 'interfaces/gym-member';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getGymMembers = async (
  query?: GymMemberGetQueryInterface,
): Promise<PaginatedInterface<GymMemberInterface>> => {
  return fetcher('/api/gym-members', {}, query);
};

export const createGymMember = async (gymMember: GymMemberInterface) => {
  return fetcher('/api/gym-members', { method: 'POST', body: JSON.stringify(gymMember) });
};

export const updateGymMemberById = async (id: string, gymMember: GymMemberInterface) => {
  return fetcher(`/api/gym-members/${id}`, { method: 'PUT', body: JSON.stringify(gymMember) });
};

export const getGymMemberById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/gym-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteGymMemberById = async (id: string) => {
  return fetcher(`/api/gym-members/${id}`, { method: 'DELETE' });
};
