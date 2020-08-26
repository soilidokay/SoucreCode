import {IUserProfile, TokenType} from './type';

class UserProfile implements IUserProfile {
  private Token: TokenType =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1bmlxdWVfbmFtZSI6InRhaW5ndXllbi5udHQuOTdAZ21haWwuY29tIiwibmFtZWlkIjoiZjJmYzZjNzEtMzFmMy00NzhmLWEzYTEtN2ZhNDRjZmQzNTNlIiwibmJmIjoxNTk4MzY2NDMwLCJleHAiOjE2MDA5NTg0MzAsImlhdCI6MTU5ODM2NjQzMH0.K4CCDJU4wpHD_mwPq607zOy49nO7_0IYS6cPM8M7rBE';
  getToken = () => this.Token;
  getTokenHeader = () => 'Bearer ' + this.Token;
}

export default new UserProfile();
