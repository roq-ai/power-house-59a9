import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createTrainingCourse } from 'apiSdk/training-courses';
import { trainingCourseValidationSchema } from 'validationSchema/training-courses';
import { GymTrainerInterface } from 'interfaces/gym-trainer';
import { getGymTrainers } from 'apiSdk/gym-trainers';
import { TrainingCourseInterface } from 'interfaces/training-course';

function TrainingCourseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingCourseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingCourse(values);
      resetForm();
      router.push('/training-courses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingCourseInterface>({
    initialValues: {
      course_name: '',
      course_duration: 0,
      course_fee: 0,
      trainer_id: (router.query.trainer_id as string) ?? null,
    },
    validationSchema: trainingCourseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Training Courses',
              link: '/training-courses',
            },
            {
              label: 'Create Training Course',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Training Course
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.course_name}
            label={'Course Name'}
            props={{
              name: 'course_name',
              placeholder: 'Course Name',
              value: formik.values?.course_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Course Duration"
            formControlProps={{
              id: 'course_duration',
              isInvalid: !!formik.errors?.course_duration,
            }}
            name="course_duration"
            error={formik.errors?.course_duration}
            value={formik.values?.course_duration}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('course_duration', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Course Fee"
            formControlProps={{
              id: 'course_fee',
              isInvalid: !!formik.errors?.course_fee,
            }}
            name="course_fee"
            error={formik.errors?.course_fee}
            value={formik.values?.course_fee}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('course_fee', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<GymTrainerInterface>
            formik={formik}
            name={'trainer_id'}
            label={'Select Gym Trainer'}
            placeholder={'Select Gym Trainer'}
            fetcher={getGymTrainers}
            labelField={'specialization'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/training-courses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'training_course',
    operation: AccessOperationEnum.CREATE,
  }),
)(TrainingCourseCreatePage);
