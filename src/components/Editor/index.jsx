import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { uploadImageToServer } from '../../helpers/posts';
import { useEffect } from 'react';

const getFileBase64 = (file, callback) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  // Since FileReader is asynchronous,
  // we need to pass data back.
  reader.onload = async e => {
    let formData = new FormData();

    formData.append('image', e.target.result);
    let res = await uploadImageToServer(formData);
    console.log(res);
    if (res.image) {
      callback(res.image.location);
    }
    if (res.error) {
      callback(res.error);
    }

    // TODO: catch an error
    reader.onerror = error => error.messsage || null;
  };
};

const uploadImageCallBack = file =>
  new Promise((resolve, reject) =>
    getFileBase64(file, data => resolve({ data: { link: data } }))
  );

function EditorContainer({
  editorState,
  setEditorState,
  postBody,
  setPostBody,
}) {
  const initState = () => {
    let blocks = JSON.parse(postBody);
    let contentState = convertFromRaw(blocks);
    return contentState;
  };

  const setConvertedToPostBody = () => {
    if (editorState === '') return;
    let convertedData = convertToRaw(editorState.getCurrentContent());
    setPostBody(prev => convertedData);
  };

  const onEditorStateChange = editorS => {
    setEditorState(editorS);
    setConvertedToPostBody();
  };
  useEffect(() => {
    if (postBody !== null) {
      let STATE = EditorState.createWithContent(initState());
      setEditorState(prev => STATE);
      let convertedData = convertToRaw(STATE.getCurrentContent());
      setPostBody(prev => convertedData);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);
  return (
    <Editor
      editorState={editorState}
      stripPastedStyles={true}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'list',
          'textAlign',
          'image',
          'link',
          'history',
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
          previewImage: true,
        },
      }}
    />
  );
}
export default EditorContainer;
