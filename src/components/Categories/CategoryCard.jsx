import { HStack, IconButton, Spinner, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import baseURL from '../../helpers/config';
import { useState } from 'react';
import { useGenCtx } from '../../context/GeneralContext';

function CategoryCard({ category, setCategory }) {
  const { FetchCategories } = useGenCtx();
  const toast = useToast();

  const [editing, setEditing] = useState(false);

  const editCategory = async value => {
    setEditing(true);
    try {
      //eslint-disable-next-line
      let dt = await axios.put(baseURL + '/article-category/' + category.uuid, {
        category: value,
      });
      setEditing(false);
      FetchCategories();
    } catch (error) {
      setEditing(false);
      toast({
        title: 'Action Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <HStack p="5" justify="space-between" bg="white" rounded="lg" shadow="md">
      <HStack>
        <Editable
          defaultValue={category.category}
          onSubmit={value => {
            if (value.trim().length === 0) return;
            editCategory(value);
          }}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        {editing && (
          <Spinner
            thickness="1px"
            speed="0.25s"
            emptyColor="secondary.100"
            color="green.500"
            size="sm"
            width="20px"
            h="20px"
          />
        )}
      </HStack>

      <HStack>
        <Text color="secondary.100" fontWeight="semibold" fontSize="1.1rem">
          {category.articlesCount}
        </Text>
        <Text as="small" color="textDark.100">
          posts
        </Text>
        <IconButton
          size="sm"
          bg="red.500"
          colorScheme="red"
          onClick={() => {
            setCategory(category);
          }}
        >
          <FaTrash />
        </IconButton>
      </HStack>
    </HStack>
  );
}

export default CategoryCard;
