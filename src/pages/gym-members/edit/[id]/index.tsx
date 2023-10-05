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
import { getGymMemberById, updateGymMemberById } from 'apiSdk/gym-members';
import { gymMemberValidationSchema } from 'validationSchema/gym-members';
import { GymMemberInterface } from 'interfaces/gym-member';
import { UserInterface } from 'interfaces/user';
import { GymInterface } from 'interfaces/gym';
import { getUsers } from 'apiSdk/users';
import { getGyms } from 'apiSdk/gyms';

function GymMemberEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<GymMemberInterface>(
    () => (id ? `/gym-members/${id}` : null),
    () => getGymMemberById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GymMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGymMemberById(id, values);
      mutate(updated);
      resetForm();
      router.push('/gym-members');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<GymMemberInterface>({
    initialValues: data,
    validationSchema: gymMemberValidationSchema,
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
              label: 'Gym Members',
              link: '/gym-members',
            },
            {
              label: 'Update Gym Member',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Gym Member
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="membership_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Membership Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.membership_start_date ? new Date(formik.values?.membership_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('membership_start_date', value)}
            />
          </FormControl>
          <FormControl id="membership_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Membership End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.membership_end_date ? new Date(formik.values?.membership_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('membership_end_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<GymInterface>
            formik={formik}
            name={'gym_id'}
            label={'Select Gym'}
            placeholder={'Select Gym'}
            fetcher={getGyms}
            labelField={'name'}
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
              onClick={() => router.push('/gym-members')}
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
    entity: 'gym_member',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GymMemberEditPage);
