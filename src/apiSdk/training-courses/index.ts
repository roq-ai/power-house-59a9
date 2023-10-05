import queryString from 'query-string';
import { TrainingCourseInterface, TrainingCourseGetQueryInterface } from 'interfaces/training-course';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTrainingCourses = async (
  query?: TrainingCourseGetQueryInterface,
): Promise<PaginatedInterface<TrainingCourseInterface>> => {
  return fetcher('/api/training-courses', {}, query);
};

export const createTrainingCourse = async (trainingCourse: TrainingCourseInterface) => {
  return fetcher('/api/training-courses', { method: 'POST', body: JSON.stringify(trainingCourse) });
};

export const updateTrainingCourseById = async (id: string, trainingCourse: TrainingCourseInterface) => {
  return fetcher(`/api/training-courses/${id}`, { method: 'PUT', body: JSON.stringify(trainingCourse) });
};

export const getTrainingCourseById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/training-courses/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteTrainingCourseById = async (id: string) => {
  return fetcher(`/api/training-courses/${id}`, { method: 'DELETE' });
};
