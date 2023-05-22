import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import {Header} from '../../components/Header';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';

import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name:string;
}

interface CategoryProps{
  categoryList:ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

  const[name, setName] = useState('');
  const[price, setPrice] = useState('');
  const[description, setDescription] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      return;
    }
    const image = e.target.files[0];

    if(!image){
      return;
    }

    if(image.type === 'image/jpg' || image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/gif'){

      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))

    }

  }

  function handleChangeCategory(event){
    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent){
    event.preventDefault();
    try{
      const data = new FormData();
      if(name === '' || price ==='' || description === '' || imageAvatar === null){
        toast.error('Missing required fields');
        return;
      }
      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiCliente = setupAPIClient();

      await apiCliente.post('/product', data);
      toast.success('Registration successful!');


    }catch(err){
      console.log(err);
      toast.error('Registration failed');
    }

    setImageAvatar(null);
    setName('');
    setPrice('');
    setDescription('');
    setAvatarUrl('');

  }

  return(
    <>
      <Head>
        <title>New product - Pizzeria</title>
      </Head>
      <div>
        <Header/>

        <main className={styles.containerCenter}>
          <div className={styles.container}>
            <h1>New product</h1>

            <form className={styles.form} onSubmit={handleRegister}>

              <label className={styles.labelAvatar}>
                <span>
                  <FiUpload size={35} color="#000" />
                </span>

                <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif " onChange={handleFile} />

                {avatarUrl && (     
                    <img 
                    src={avatarUrl}
                    alt="Product's image"
                    width={250}
                    height={200}
                    className={styles.preview}
                    />
                )}

              </label>

              <select value={categorySelected} onChange={handleChangeCategory}>
               
                {categories.map( (item, index) => { 
                  return(
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  )
                })}

              </select>

              <input 
              type="text"
              placeholder="Product's name"
              className={styles.input}
              value={name}
              onChange={ (e) => setName(e.target.value)}
              />

              <input 
              type="text"
              placeholder="Price"
              className={styles.input}
              value={price}
              onChange={ (e) => setPrice(e.target.value)}
              />      

              <textarea 
                placeholder="Description..."
                className={styles.input}
                value={description}
                onChange={ (e) => setDescription(e.target.value)}
              /> 

              <button className={styles.buttonAdd} type="submit">
                Register  
              </button>   

            </form>
          </div>
        </main>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/category');
  return {
    props: {
      categoryList: response.data
    }
  }
})