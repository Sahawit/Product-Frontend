import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://26.108.209.46:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});
