import axios from 'axios';
import {Config} from 'assets/Config';
import UserProfile from 'Providers/Accessors/UserProfile';

export default axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
  headers: {Authorization: UserProfile.getTokenHeader()},
});
