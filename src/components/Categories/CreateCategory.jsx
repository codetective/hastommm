import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useGenCtx } from '../../context/GeneralContext';

export default function CreateCategory(props) {
  const [newCategory, setNewCategory] = useState('');
  const { CreateCategory, creatingCat, creatingCatError } = useGenCtx();

  const submitCategory = () => {
    if (newCategory.trim() === '') return;
    CreateCategory(newCategory);
  };

  return (
    <InputGroup size="md" {...props}>
      <Input
        pr="4rem"
        borderLeftRadius="lg"
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
          disabled={newCategory.trim().length === 0}
          h="100%"
          size="sm"
          borderRightRadius="lg"
          w="100%"
          rounded="0"
          _focus={{
            borderRightRadius: 'lg',
          }}
        >
          <BiPlus />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
