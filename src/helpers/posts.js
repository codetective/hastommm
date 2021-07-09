import axios from 'axios';
import baseURL from './config';

const uploadImageToServer = async formData => {
  try {
    let dt = await axios.post(baseURL + '/article/image', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    const { data } = dt;

    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};
const publishPost = async formData => {
  try {
    let dt = await axios.post(baseURL + '/article/create', formData);
    const { data } = dt;
    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const updatePost = async (formData,uuid) => {
  try {
    let dt = await axios.put(baseURL + '/article/update/'+uuid, formData);
    const { data } = dt;
    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

export { uploadImageToServer, publishPost, updatePost };
