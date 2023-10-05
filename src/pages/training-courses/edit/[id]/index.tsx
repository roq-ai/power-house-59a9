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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getTrainingCourseById, updateTrainingCourseById } from 'apiSdk/training-courses';
import { trainingCourseValidationSchema } from 'validationSchema/training-courses';
import { TrainingCourseInterface } from 'interfaces/training-course';
import { GymTrainerInterface } from 'interfaces/gym-trainer';
import { getGymTrainers } from 'apiSdk/gym-trainers';

function TrainingCourseEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<TrainingCourseInterface>(
    () => (id ? `/training-courses/${id}` : null),
    () => getTrainingCourseById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrainingCourseInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrainingCourseById(id, values);
      mutate(updated);
      resetForm();
      router.push('/training-courses');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<TrainingCourseInterface>({
    initialValues: data,
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
              label: 'Update Training Course',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Training Course
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(TrainingCourseEditPage);
