import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import {Input} from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import { toast } from 'react-toastify';

import Link from 'next/link';

export default function Home() {
  const { signIn }= useContext( AuthContext );

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning('Missing required fields.');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);
    setLoading(false);
  }

  return (
    <>
    <Head>
      <title>Pizzeria</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzeria" />
      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder='Email'
            type='text'
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input
            placeholder='Password'
            type='password'
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          <Button
            type='submit'
            loading={loading}
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
