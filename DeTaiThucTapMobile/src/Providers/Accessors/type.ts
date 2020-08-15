export interface IUserProfile {
  getToken: () => TokenType;
  getTokenHeader: () => TokenType;
}
export type TokenType = string | null;
