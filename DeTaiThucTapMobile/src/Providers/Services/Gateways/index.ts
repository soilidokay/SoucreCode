import axios from 'axios';
import {Config} from 'assets/Config';
import UserProfile from 'Providers/Accessors/UserProfile';

const Instance = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
  headers: {
    Authorization: UserProfile.getTokenHeader(),
    post: {
      'content-type': 'multipart/form-data',
    },
    put: {
      'content-type': 'multipart/form-data',
    },
  },
});
export default Instance;
