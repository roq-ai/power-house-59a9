import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface NutritionistInterface {
  id?: string;
  experience_years: number;
  specialization: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface NutritionistGetQueryInterface extends GetQueryInterface {
  id?: string;
  specialization?: string;
  user_id?: string;
}
