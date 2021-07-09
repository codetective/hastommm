import React, { useState } from 'react';
import {
  Box,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  useToast,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import AuthorCategory from './AuthorCategory';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';
import baseURL from '../../helpers/config';
import { FaTrash } from 'react-icons/fa';
function convertCommentFromJSONToHTML(text) {
  let blocks = JSON.parse(text);
  return stateToHTML(convertFromRaw(blocks));
}

function PostCard({ post }) {
  const toast = useToast();
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const deletePost = async () => {
    setDeleting(true);
    try {
      let dt = await axios.delete(baseURL + '/article/' + post.uuid);
      setDeleted(true);
      onClose();
      setDeleting(false);
      toast({
        title: 'Article Deleted',
        description: 'Article card will be removed on refresh',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setDeleting(false);
      onClose();
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
    <Box
      pointerEvents={deleted && 'none'}
      filter={deleted && 'grayscale(1)'}
      as="div"
      shadow="lg"
      borderTopLeftRadius="10px"
      borderTopRightRadius="10px"
      width={['100%', '100%', '100%', '100%']}
      bg="white"
      mx="auto"
      rounded="20px"
      position="relative"
    >
      <Box
        width="100%"
        minHeight="180px"
        height="180px"
        maxHeight="180px"
        zIndex="2"
        rounded="0"
        mb={4}
      >
        <Link
          to={'/posts/edit/' + post.uuid}
          _hover={{ textDecoration: 'none' }}
          style={{
            textDecoration: 'none',
          }}
        >
          {post.images.length === 0 ? (
            <Image
              roundedTop="20px"
              borderTopRightRadius="10px"
              borderTopLeftRadius="10px"
              margin="auto"
              src={placeholder}
              alt="some good alt text"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          ) : (
            <Image
              roundedTop="20px"
              borderTopRightRadius="10px"
              borderTopLeftRadius="10px"
              margin="auto"
              src={post.images[0].location}
              alt="some good alt text"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          )}
        </Link>
      </Box>

      <Stack>
        <Flex justify="space-between" pr={6}>
          <AuthorCategory
            category={post.category ? post.category.category : 'EMPTY'}
            author={post.author.name}
          />
        </Flex>
        <Box p={4}>
          <Heading
            className="qfont line-clamp"
            fontSize={['18px', '20px', '20px', '20px']}
          >
            <Link
              className="afont"
              to={'/posts/edit/' + post.uuid}
              _hover={{ textDecoration: 'none' }}
              style={{
                textDecoration: 'none',
              }}
            >
              {post.title}
            </Link>
          </Heading>
          <Box
            id="conntent-box"
            color="textDark"
            py={'15px'}
            height="100px"
            className="line-clamp"
          >
            <Box
              dangerouslySetInnerHTML={{
                __html: convertCommentFromJSONToHTML(post.content),
              }}
            />
          </Box>
          <HStack justify="space-between" align="center" pt="10px">
            <Text as={'p'} color="textDark.100" className="qfont">
              <ReactTimeAgo date={post.create_at} />
            </Text>

            {!deleted && (
              <IconButton
                size="sm"
                colorScheme="red"
                onClick={() => setIsOpen(true)}
              >
                {deleted ? 'DELETED' : <FaTrash />}
              </IconButton>
            )}
            {deleted && (
              <Button size="sm" className="qfont">
                Deleted
              </Button>
            )}

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Article
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      isLoading={deleting}
                      onClick={deletePost}
                      ml={3}
                    >
                      I'm Sure.
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
}

export default PostCard;
