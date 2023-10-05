import { GymMemberInterface } from 'interfaces/gym-member';
import { GymTrainerInterface } from 'interfaces/gym-trainer';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GymInterface {
  id?: string;
  description?: string;
  location?: string;
  opening_hours?: string;
  closing_hours?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  gym_member?: GymMemberInterface[];
  gym_trainer?: GymTrainerInterface[];
  user?: UserInterface;
  _count?: {
    gym_member?: number;
    gym_trainer?: number;
  };
}

export interface GymGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  opening_hours?: string;
  closing_hours?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
