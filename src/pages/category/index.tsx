import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';

import {setupAPIClient} from '../../services/api';
import { toast } from 'react-toastify';

export default function Category(){

  const [name, setName] = useState('');

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    
    if(name ===''){
      toast.warning('Missing required field.')
      return;
    }
    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name: name
    })

    toast.success('Category saved successfully!');
    setName('');
    
  }

  return(
    <>
      <Head>
        <title>Caetgory - Pizzeria</title>
      </Head>
      
      <Header />

      <main className={styles.containerCenter}>
        <div className={styles.container}>
          <h1>
            New category
          </h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Type the category"
              className={styles.input}
              value={name}
              onChange={ (e) => setName(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  )  
}