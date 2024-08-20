import axios from 'axios';

const apiUrl = 'https://my-json-server.typicode.com/typicode/demo/posts';

async function getPosts() {
  try {
    const response = await axios.get(`${apiUrl}/posts`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getPostById(id: number) {
  try {
    const response = await axios.get(`${apiUrl}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getPosts, getPostById };
