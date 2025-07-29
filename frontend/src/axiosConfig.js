import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // or your backend URL
  // You can add headers here if needed
});

export default instance;
