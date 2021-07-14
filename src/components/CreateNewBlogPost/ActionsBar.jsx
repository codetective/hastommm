import {
  Stack,
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  HStack,
  Icon,
  useToast,
  Button,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { FcKindle, FcOpenedFolder, FcPicture } from 'react-icons/fc';
import { MdCancel, MdCheckCircle, MdTitle } from 'react-icons/md';
import { useGenCtx } from '../../context/GeneralContext';
import { publishPost, updatePost } from '../../helpers/posts';

export default function ActionsBar({
  action,
  image,
  category,
  title,
  postBody,
  setInputsEmpty,
  uuid,
}) {
  const [publishing, setPublishing] = useState(false);
  const toast = useToast();
  const { FetchCategories } = useGenCtx();

  function toastify(t, d) {
    return toast({
      title: t,
      description: d,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
  }

  const PUBLISH_POST = async () => {
    //  check fields begin
    if (title.trim() === '')
      return toastify(
        'Missing Title!',
        'Write a reasonable post title in the box provided'
      );
    if (category === null)
      return toastify(
        'Missing Category!',
        'Select or create a category to proceed'
      );
    if (image === null)
      return toastify(
        'Missing Image!',
        'Select or upload an image for the header'
      );
    if (postBody === '')
      return toastify(
        'Missing Content!',
        'Please write a good article to proceed'
      );
    const data = {
      user_id: 13,
      title: title,
      description: JSON.stringify(postBody),
      article_type: 'normal',
      fileIds: [image.id],
      article_category_id: category.id,
    };
    setPublishing(true);
    let res =
      action === 'PUBLISH'
        ? await publishPost(data)
        : await updatePost(data, uuid);
    if (res.success) {
      setPublishing(false);
      if (action === 'PUBLISH') {
        setInputsEmpty();
      }
      FetchCategories();
      return toast({
        title: 'Article Published.',
        status: 'success',
        duration: 10000,
        isClosable: true,
      });
    }
    if (res.error) {
      setPublishing(false);
      return toast({
        title: 'Publishing failed.',
        description: 'An error ocurred, please try again.',
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack minW="250px">
      <Box>
        <Box
          rounded="lg"
          px="5"
          py="2"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text>Actions</Text>
        </Box>

        <Box
          rounded="lg"
          px="5"
          py="2"
          bg="white"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <List spacing={3}>
            <ListItem as={HStack}>
              <ListIcon as={FcPicture} />
              <HStack justifyContent="space-between" width="100%">
                <Text>Header Image:</Text>
                {image === null ? (
                  <Icon as={MdCancel} color="red" />
                ) : (
                  <Icon as={MdCheckCircle} color="green.500" />
                )}
              </HStack>
            </ListItem>

            <ListItem as={HStack}>
              <ListIcon as={FcOpenedFolder} />
              <HStack justifyContent="space-between" width="100%">
                <Text>Category:</Text>
                {category === null ? (
                  <Icon as={MdCancel} color="red" />
                ) : (
                  <Text color="primary.100" className="qfont" fontWeight="bold">
                    {category.category}
                  </Text>
                )}
              </HStack>
            </ListItem>

            <ListItem as={HStack}>
              <ListIcon as={FcKindle} />
              <HStack justifyContent="space-between" width="100%">
                <Text>Content:</Text>
                {postBody === '' ? (
                  <Icon as={MdCancel} color="red" />
                ) : (
                  <Icon as={MdCheckCircle} color="green.500" />
                )}
              </HStack>
            </ListItem>

            <ListItem as={HStack}>
              <ListIcon as={MdTitle} />
              <HStack justifyContent="space-between" width="100%">
                <Text>Title:</Text>
                {title === '' ? (
                  <Icon as={MdCancel} color="red" />
                ) : (
                  <Icon as={MdCheckCircle} color="green.500" />
                )}
              </HStack>
            </ListItem>
          </List>
        </Box>
        <Flex
          mt="1"
          rounded="lg"
          px="5"
          py="2"
          alignItems="flex-end"
          flexDir="column"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Button
            isLoading={publishing}
            loadingText="publishing..."
            color="white"
            bg="primary.100"
            colorScheme="green"
            onClick={PUBLISH_POST}
          >
            {action === 'EDIT' ? 'UPDATE' : action}
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
