import * as yup from 'yup';

export const trainingCourseValidationSchema = yup.object().shape({
  course_name: yup.string().required(),
  course_duration: yup.number().integer().required(),
  course_fee: yup.number().integer().required(),
  trainer_id: yup.string().nullable().required(),
});
