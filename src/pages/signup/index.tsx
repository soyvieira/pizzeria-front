import { useState, FormEvent, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import {Input} from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { AuthContext } from '../../contexts/AuthContext';

import { toast } from 'react-toastify';

import Link from 'next/link';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent ){
    event.preventDefault();

    if(name === '' || email === '' || password ===''){
      toast.warning('Missing required fields.')
      return;
    }

    setLoading(true);
    let data = {
      name,
      email, 
      password
    }

    await signUp(data);

    setLoading(false);

  }

  return (
    <>
    <Head>
      <title>Register here - Pizzeria</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzeria" />
      <div className={styles.login}>
        <h1>Register here</h1>
        <form onSubmit={handleSignUp}>
          <Input
            placeholder='Your name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='Email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            loading={loading}
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
