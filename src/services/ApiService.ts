import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4200',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

api.defaults.withCredentials = true;

export { api };
