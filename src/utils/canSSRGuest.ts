import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import { parseCookies } from 'nookies';

//function for guest pages
export function canSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>){
  return async ( ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);

    //if an user tries to access a page, but a login already exists:
    if(cookies['@nextauth.token']){
      return{
        redirect:{
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return await fn(ctx);
  }
}