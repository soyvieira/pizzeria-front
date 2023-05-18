import { ReactNode, ButtonHTMLAttributes, HtmlHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import {FaSpinner} from 'react-icons/fa';

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading?: boolean,
  children: ReactNode
}

export function Button ({loading, children, ...rest}: buttonProps){
  return(
    <button
      className={styles.button}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <FaSpinner color='#fff' size={16} />
      ) : (
        <a className={styles.buttonText}>
          {children}
        </a>
      )}
    </button>
  )
}