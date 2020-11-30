import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function loginUser(dataTosubmit) { 
  const request = axios.post('http://localhost:5000/api/users/login', dataTosubmit).then(res => res.data);
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function registerUser(dataToSubmit) { 
  const request = axios.post('http://localhost:5000/api/users/register', dataToSubmit).then(res => res.data);
  return {
    type: REGISTER_USER,
    payload: request
  }
}