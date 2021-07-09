import {
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Button,
  Box,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGenCtx } from '../../context/GeneralContext';
import CategorySelect from './CategorySelect';
import { BiPlus } from 'react-icons/bi';
import HeaderImageBox from './HeaderImageBox';

export default function CategoryBox({
  setPostCategory,
  setPostImage,
  postImage,
  upload,
}) {
  const [newCategory, setNewCategory] = useState('');
  const { CreateCategory, creatingCat, creatingCatError } = useGenCtx();

  const submitCategory = () => {
    if (newCategory.trim() === '') return;
    CreateCategory(newCategory);
  };

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
          <InputGroup size="md">
            <Input
              pr="4rem"
              type="text"
              placeholder="new category..."
              value={newCategory}
              textTransform="capitalize"
              onChange={e => {
                setNewCategory(e.target.value);
              }}
              borderColor={creatingCatError ? 'red.700' : 'gray.100'}
            />
            <InputRightElement width="4rem">
              <Button
                onClick={submitCategory}
                isLoading={creatingCat}
                fontSize="30px"
                colorScheme="green"
                h="100%"
                size="sm"
                w="100%"
                rounded="0"
                _focus={{
                  borderRadius: 'none',
                }}
              >
                <BiPlus />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Stack>
  );
}
