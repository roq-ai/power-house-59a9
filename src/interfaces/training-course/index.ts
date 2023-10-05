import { GymTrainerInterface } from 'interfaces/gym-trainer';
import { GetQueryInterface } from 'interfaces';

export interface TrainingCourseInterface {
  id?: string;
  course_name: string;
  course_duration: number;
  course_fee: number;
  trainer_id: string;
  created_at?: any;
  updated_at?: any;

  gym_trainer?: GymTrainerInterface;
  _count?: {};
}

export interface TrainingCourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  course_name?: string;
  trainer_id?: string;
}
