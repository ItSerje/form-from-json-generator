import { FC } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import FormComponents from '../../../components/form';

type ModalProps = {
    closeModal: ()=>void
}

const Modal: FC<ModalProps> = ({closeModal}) => {
  return (
    <aside className='form-modal'>
      <div className='container neuromorphic'>
        <span onClick={closeModal}>
          <FaRegTimesCircle />
        </span>
        <div>
          <FormComponents.Button value='Copy Values' />
          <FormComponents.Button value='Reset Form' />
        </div>
      </div>
    </aside>
  );
};

export default Modal;
