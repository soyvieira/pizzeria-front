import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import {Input} from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import logoImg from '../../../public/logo.svg';

import Link from 'next/link';

export default function SignUp() {
  return (
    <>
    <Head>
      <title>Register here - Pizzeria</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzeria" />
      <div className={styles.login}>
        <h1>Register here</h1>
        <form>
          <Input
            placeholder='Your name'
            type='text'
          />
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
            Sign up
          </Button>
        </form>

        <Link href="/">
          <p className={styles.text}> Do you already have an account? Log in here</p>
        </Link>

      </div>
    </div>
    </>
  )
}
