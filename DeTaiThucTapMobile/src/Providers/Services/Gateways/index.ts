import axios from 'axios';
import {Config} from 'assets/Config';
import UserProfile from 'Providers/Accessors/UserProfile';

export default axios.create({
  baseURL: Config.API_URL,
  timeout: 1000,
  headers: {Authorization: 'Bearer ' + UserProfile.getTokenHeader()},
});
