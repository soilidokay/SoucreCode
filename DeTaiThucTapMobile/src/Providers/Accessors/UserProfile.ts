import {IUserProfile, TokenType} from './type';
import {Config} from 'assets/Config';
import {HttpServiceBase} from 'Providers/Services/Gateways/HttpServiceBase';
import {Alert} from 'react-native';
import GetWays from '../Services/Gateways';
class UserProfile implements IUserProfile {
  private _Email?: string;
  public ActionNavigateApp?: (isLogin: boolean) => void = undefined;
  private Token: TokenType = null;
  getToken = () => this.Token;
  getTokenHeader = () => 'Bearer ' + this.Token;

  isLogin = () => {
    return this.Token !== null;
  };
  getEmail = () => this._Email;
  Logout = () => {
    this.Token = null;
    GetWays.defaults.headers.common.Authorization = this.getTokenHeader();
    this.ActionNavigateApp && this.ActionNavigateApp(false);
  };
  Login = async (data: {UserName: string; PassWord: string}) => {
    const service = new HttpServiceBase();
    const Token = await service
      .POST(Config.API_LOGIN, data, {})
      .catch(() => '');
    if (Token) {
      this.Token = Token;
      this._Email = data.UserName;
      GetWays.defaults.headers.common.Authorization = this.getTokenHeader();
      this.ActionNavigateApp && this.ActionNavigateApp(true);
    } else {
      Alert.alert('Please, Checking info login again!');
    }
  };
}

export default new UserProfile();
