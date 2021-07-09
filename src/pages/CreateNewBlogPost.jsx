import { Box, FormControl, Input, SimpleGrid, Stack } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import CategoryBox from '../components/CreateNewBlogPost/CategoryBox';

import EditorContainer from '../components/Editor';

import PageTitle from '../components/Global/PageTitle';
import categories from '../helpers/categories';
import FileUploadWithPreview from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import { useEffect } from 'react';
import ActionsBar from '../components/CreateNewBlogPost/ActionsBar';

export default function CreateNewBlogPost() {
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [postBody, setPostBody] = useState('');
  const [editorState, setEditorState] = useState('');

  let upload = useRef();

  const setInputsEmpty = () => {
    setPostTitle('');
    setPostCategory(null);
    setPostImage(null);
    setEditorState('');
    setPostBody('');
    upload.current.clearPreviewPanel();
  };

  useEffect(() => {
    console.log('renered');
    upload.current = new FileUploadWithPreview('blogHeaderImage', {
      text: {
        chooseFile: '.png, .jpeg, .jpg only',
        browse: 'Browse',
      },
    });
  }, []);

  return (
    <Box pb="50px">
      <PageTitle title="Add New Post" category={categories.blog} />
      <SimpleGrid
        columns={[1, 2]}
        spacing="30px"
        templateColumns={['ifr', '1fr', '1fr', '3fr 1fr']}
      >
        <Stack spacing="30px">
          <Box className="editor" rounded="lg" p="5" bg="white" h="fit-content">
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
            <EditorContainer
              postBody={null}
              setPostBody={setPostBody}
              setEditorState={setEditorState}
              editorState={editorState}
            />
          </Box>
          <ActionsBar
            title={postTitle}
            postBody={postBody}
            category={postCategory}
            image={postImage}
            action={'PUBLISH'}
            setInputsEmpty={setInputsEmpty}
          />
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
