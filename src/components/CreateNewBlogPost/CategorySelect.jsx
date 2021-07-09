import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { useGenCtx } from '../../context/GeneralContext';
import { AiOutlineReload } from 'react-icons/ai';

function CategoryCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'secondary.100',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        px={3}
        py={2}
        onClick={() => {
          props.setPostCategory(props.category);
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function CategorySelect({ setPostCategory }) {
  const { categories, fetchError, FetchCategories, loadingCategories } =
    useGenCtx();

  const logV = e => {
    console.log(e);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'category',
    onChange: logV,
  });

  const group = getRootProps();

  return (
    <>
      {categories && !loadingCategories && !fetchError && (
        <Stack {...group}>
          {categories.map((value, i) => {
            const radio = getRadioProps({ value: value.category });
            let count =
              value.articlesCount !== undefined ? value.articlesCount : '';
            return (
              <CategoryCard
                key={i}
                {...radio}
                category={value}
                setPostCategory={setPostCategory}
              >
                <Flex justifyContent="space-between">
                  <Text> {value.category}</Text>
                  <Text> {count}</Text>
                </Flex>
              </CategoryCard>
            );
          })}
        </Stack>
      )}

      {loadingCategories && !fetchError && (
        <Stack spacing="4">
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
          <Skeleton height="50px" />
        </Stack>
      )}

      {!loadingCategories && fetchError && (
        <Stack spacing="4">
          <Alert status="error">
            <AlertIcon />
            <Text> An error occurred!</Text>
            <IconButton
              ml="4"
              onClick={FetchCategories}
              colorScheme="teal"
              aria-label="reload"
              size="sm"
              icon={<AiOutlineReload />}
            />
          </Alert>
        </Stack>
      )}
    </>
  );
}
