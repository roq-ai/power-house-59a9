import * as yup from 'yup';

export const gymMemberValidationSchema = yup.object().shape({
  membership_start_date: yup.date().required(),
  membership_end_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  gym_id: yup.string().nullable().required(),
});
