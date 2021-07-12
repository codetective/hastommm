import { Stack, Text, Box } from '@chakra-ui/react';
import React from 'react';
import CategorySelect from './CategorySelect';
import HeaderImageBox from './HeaderImageBox';
import CreateCategory from '../Categories/CreateCategory';

export default function CategoryBox({
  setPostCategory,
  setPostImage,
  postImage,
  upload,
}) {
  return (
    <Stack minW="250px" spacing="30px">
      <Box>
        <Box rounded="lg" px="5" py="2" bg="white">
          <HeaderImageBox
            setPostImage={setPostImage}
            upload={upload}
            postImage={postImage}
          />
        </Box>
      </Box>
      <Box>
        <Box
          rounded="lg"
          px="5"
          py="2"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text>Category</Text>
        </Box>
        <Box rounded="lg" p="5" bg="white">
          <CategorySelect setPostCategory={setPostCategory} />
        </Box>
        <Box
          rounded="lg"
          px="5"
          py="2"
          bg="white"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <CreateCategory />
        </Box>
      </Box>
    </Stack>
  );
}
