import {
  Box,
  CloseButton,
  FormLabel,
  Input,
  Image,
  Flex,
  Text,
  Button,
  useToast,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { uploadImageToServer } from '../../helpers/posts';
import { FaUndo } from 'react-icons/fa';

export default function HeaderImageBox({ setPostImage, upload, postImage }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const _handleReaderLoaded = async readerEvt => {
    let binaryString = readerEvt.target.result;
    let formData = new FormData();

    formData.append('image', binaryString);
    setLoading(true);
    let res = await uploadImageToServer(formData);
    console.log(res);
    if (res.image) {
      setPostImage(res.image);
      setLoading(false);
    }
    if (res.error) {
      setLoading(false);
      return toast({
        title: 'Upload failed.',
        description: 'An error ocurred, please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const uploadImage = async () => {
    if (upload.current.cachedFileArray[0] === undefined)
      return toast({
        title: 'No image.',
        description: 'Select an image file.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });

    let file = upload.current.cachedFileArray[0];

    const reader = new FileReader();
    reader.onload = _handleReaderLoaded;
    reader.readAsDataURL(file);
  };

  return (
    <Box className="wrapper" w="100%">
      <Box className="custom-file-container" data-upload-id="blogHeaderImage">
        <FormLabel>
          <Flex
            rounded="lg"
            py="2"
            bg="white"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            <Text>Header Image</Text>
            <CloseButton
              bg="red.200"
              color="white"
              as="a"
              className="custom-file-container__image-clear"
              title="Clear Image"
            />
          </Flex>
        </FormLabel>
        <FormLabel className="custom-file-container__custom-file">
          <Input
            disabled={postImage}
            color="gray.100"
            type="file"
            className="custom-file-container__custom-file__custom-file-input"
            accept="image/*"
          />
          <Input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
          <Box
            cursor={postImage && 'not-allowed'}
            as="span"
            className="custom-file-container__custom-file__custom-file-control"
          ></Box>
        </FormLabel>

        <Image
          src={postImage && postImage.location}
          backgroundSize="contain"
          backgroundPosition="center"
          maxHeight="210px"
          className="custom-file-container__image-preview"
        ></Image>

        <ButtonGroup>
          <Button
            isLoading={loading}
            disabled={postImage !== null}
            loadingText="uploading..."
            color="white"
            bg="primary.100"
            colorScheme="green"
            onClick={() => {
              console.log(upload);
              uploadImage();
            }}
          >
            {postImage === null ? 'Upload & Select' : 'Selected'}
          </Button>
          <IconButton
            title="reset image"
            bg="red"
            colorScheme="red"
            disabled={postImage === null}
            ml="auto"
            onClick={() => {
              setPostImage(null);
              upload && upload.current.clearPreviewPanel();
              console.log(upload.current.clearPreviewPanel);
            }}
            fontSize="20px"
            color="white"
          >
            <FaUndo />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
