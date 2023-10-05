import { TrainingCourseInterface } from 'interfaces/training-course';
import { UserInterface } from 'interfaces/user';
import { GymInterface } from 'interfaces/gym';
import { GetQueryInterface } from 'interfaces';

export interface GymTrainerInterface {
  id?: string;
  experience_years: number;
  specialization: string;
  user_id: string;
  gym_id: string;
  created_at?: any;
  updated_at?: any;
  training_course?: TrainingCourseInterface[];
  user?: UserInterface;
  gym?: GymInterface;
  _count?: {
    training_course?: number;
  };
}

export interface GymTrainerGetQueryInterface extends GetQueryInterface {
  id?: string;
  specialization?: string;
  user_id?: string;
  gym_id?: string;
}
