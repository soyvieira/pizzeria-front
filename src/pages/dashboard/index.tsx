import { canSSRAuth } from '../../utils/canSSRAuth';

import Head from 'next/head';
import styles from '../../../styles/home.module.scss';

export default function Dashboard(){
  return (
    <>
    <Head>
      <title>Register here - Pizzeria</title>
    </Head>
    <div className={styles.containerCenter}>
      <h1>Welcome to dashboard!</h1>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return{
    props:{}
  }
})

