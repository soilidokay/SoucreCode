import {IUserProfile, TokenType} from './type';

class UserProfile implements IUserProfile {
  private Token: TokenType = null;
  getToken = () => this.Token;
  getTokenHeader = () => 'Bearer  ' + this.Token;
}

export default new UserProfile();
