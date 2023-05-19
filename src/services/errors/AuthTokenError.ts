export class AuthTokenError extends Error{
  constructor(){
    super('Error with Autentication token');
  }
}