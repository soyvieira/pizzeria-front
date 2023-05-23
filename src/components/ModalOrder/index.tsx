import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id:string) => void;
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}:ModalOrderProps){

  const customStyles ={
    content: {
      top: '50%',
      botton: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      color: '#000',
      backgroundColor: '#f5f5f5',

    }
  };

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className={styles.headerModal}>
        <h2>Table {order[0].order.table}</h2>
        <button
          type='button'
          onClick={onRequestClose}
          className='react-modal-close'
          style={{ background: 'transparent', border:0 }}
        >
          <FiX size={30} color='EC5453' />
        </button>
      </div>
      <div className={styles.container}>
        {order.map ( item => (
          <section key={item.id} className={styles.containerItem}>
            <span className={styles.productName}> 
              {item.product.name} 
              <strong className={styles.amount}> [ {item.amount} unit ]</strong>
            </span>
          </section>
        ))}
        <button
          className={styles.buttonOrder}
          onClick={ () =>  handleFinishOrder(order[0].order_id)}
        >
          Finished
        </button>
      </div>
    </Modal>
  )
}