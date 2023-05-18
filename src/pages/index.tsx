import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import {Input} from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import logoImg from '../../public/logo.svg';

import Link from 'next/link';

export default function Home() {
  return (
    <>
    <Head>
      <title>Pizzeria</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzeria" />
      <div className={styles.login}>
        <form>
          <Input
            placeholder='Email'
            type='text'
          />
          <Input
            placeholder='Password'
            type='password'
          />
          <Button
            type='submit'
            loading={false}
          >
            Log in
          </Button>
        </form>

        <Link href="/signup">
          <p className={styles.text}> Don't have an account? Register here</p>
        </Link>

      </div>
    </div>
    </>
  )
}
