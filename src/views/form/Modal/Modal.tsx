import { FormikValues } from 'formik';
import { FC, useRef, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import FormComponents from '../../../components/form';
import useOutsideClick from '../../../hooks/useOutsideClick';

type ModalProps = {
  closeModal: () => void;
  values: FormikValues;
  resetForm: () => void;
};

const Modal: FC<ModalProps> = ({ closeModal, values, resetForm }) => {
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => closeModal());

  return (
    <aside className='form-modal'>
      <div ref={ref} className='container neuromorphic'>
        <span onClick={closeModal}>
          <FaRegTimesCircle />
        </span>
        {!message && (
          <h1 className='form-modal__heading form-modal__heading--top'>
            Entered values are validated
          </h1>
        )}
        {message && (
          <h1 className='form-modal__heading form-modal__heading--bottom'>
            {message}
          </h1>
        )}
        <div>
          <FormComponents.Button
            value='Copy Values'
            onClick={() => {
              setMessage('Values Copied');
              navigator.clipboard.writeText(JSON.stringify(values, null, 2));
            }}
          />
          <FormComponents.Button
            value='Reset Form'
            onClick={() => {
              setMessage('Form Reset');
              resetForm();
            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Modal;
