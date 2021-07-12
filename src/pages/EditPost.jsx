import {
  Box,
  Center,
  FormControl,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import CategoryBox from '../components/CreateNewBlogPost/CategoryBox';
import EditorContainer from '../components/Editor';
import PageTitle from '../components/Global/PageTitle';
import categories from '../helpers/categories';
import FileUploadWithPreview from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import { useEffect } from 'react';
import baseURL from '../helpers/config';
import axios from 'axios';
import ErrorAlert from '../components/Global/ErrorAlert';
import ActionsBar from '../components/CreateNewBlogPost/ActionsBar';

export default function EditPost() {
  let { uuid } = useParams();
  let upload = useRef();

  const [editorState, setEditorState] = useState('');

  const [article, setArticle] = useState(null);

  const [postTitle, setPostTitle] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [postCategory, setPostCategory] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [error, setError] = useState(false);
  const [postBody, setPostBody] = useState('');

  const initValues = article => {
    setPostTitle(article.title);
    setPostCategory(article.category);
    setPostImage(article.images.length === 0 ? null : article.images[0]);
  };

  const fetchArticle = async () => {
    setLoadingArticle(true);
    setError(null);
    try {
      const dt = await axios.get(baseURL + '/article/' + uuid);
      const { data } = dt.data;
      setError(null);
      setArticle(data);
      initValues(data);
      setLoadingArticle(false);
    } catch (error) {
      setError(error.message);
      setLoadingArticle(false);
    }
  };

  useEffect(() => {
    upload.current = new FileUploadWithPreview('blogHeaderImage', {
      text: {
        chooseFile: '.png, .jpeg, .jpg only',
        browse: 'Change',
      },
    });
    fetchArticle();
    //eslint-disable-next-line
  }, []);

  return (
    <Box pb="50px">
      <PageTitle title="Edit Post" category={categories.blog} />
      <SimpleGrid
        columns={[1, 2]}
        spacing="30px"
        templateColumns={['ifr', '1fr', '1fr', '3fr 1fr']}
      >
        <Stack spaacing="30px">
          <Box className="editor" rounded="lg" p="5" bg="white" h="fit-content">
            {error && (
              <ErrorAlert
                title="Error fetching article"
                message="Something went wrong while fetching this article, please ..."
                retryFunc={fetchArticle}
              />
            )}
            <FormControl id="post-title" pb="5">
              <Input
                type="text"
                placeholder="post title here"
                value={postTitle}
                onChange={e => {
                  setPostTitle(e.target.value);
                }}
              />
            </FormControl>
            {!loadingArticle && !error && (
              <>
                <EditorContainer
                  editorState={editorState}
                  setEditorState={setEditorState}
                  setPostBody={setPostBody}
                  postBody={article && article.content}
                />

                <ActionsBar
                  title={postTitle}
                  postBody={postBody}
                  category={postCategory}
                  image={postImage}
                  action={'EDIT'}
                  uuid={uuid}
                />
              </>
            )}
          </Box>
          {loadingArticle && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.25s"
                emptyColor="gray.200"
                color="green.500"
                size="200px"
                width="150px"
                h="150px"
              />
            </Center>
          )}
        </Stack>
        <CategoryBox
          setPostCategory={setPostCategory}
          setPostImage={setPostImage}
          postImage={postImage}
          upload={upload}
        />
      </SimpleGrid>
    </Box>
  );
}
