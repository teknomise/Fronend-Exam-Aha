import axios from 'axios';

const api = axios.create({
  baseURL: 'https://avl-frontend-exam.herokuapp.com/api',
  timeout: 10000,
});

export const getUsers = async (page: number, pageSize: number, keyword: string) => {
  const url = `/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  try {
    const response = await api.get(url);
    const users = response.data.data;
    return users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      throw error.message;
    }
    throw error;
  }
};

export const getTags = async () => {
  const url = '/tags';

  try {
    const response = await api.get(url);
    const tags = response.data;
    return tags;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      throw error.message;
    }
    throw error;
  }
};
