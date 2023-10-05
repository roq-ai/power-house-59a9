import * as yup from 'yup';

export const gymTrainerValidationSchema = yup.object().shape({
  experience_years: yup.number().integer().required(),
  specialization: yup.string().required(),
  user_id: yup.string().nullable().required(),
  gym_id: yup.string().nullable().required(),
});
