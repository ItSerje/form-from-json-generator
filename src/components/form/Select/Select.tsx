import { useField } from 'formik';
import styles from '../form.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

// export type SelectProps = JSX.IntrinsicElements['select'] & {
//   label: string;
//   name: string;
//   placeholder?: string;
//   options?: {
//     value: string;
//     label: string;
//   }[];
// };

export type SelectProps = {
  name: string;
  required?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
};

export const Select = (props: SelectProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);
  const { options, required, ...rest } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(
    options && options[0].label ? options[0].label : ''
  );

  const toggleShowOptions = () => {
    setShowOptions((v) => !v);
  };

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowOptions(false));

  const handleSelection = (value: string, label: string) => {
    setCurrentLabel(label);
    helpers.setValue(value);
    setShowOptions(false);
  };

  if (!options) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      className={showOptions ? `dropdown show` : 'dropdown'}
      onClick={toggleShowOptions}
    >
      <div className='dropdown__value'>{currentLabel}</div>
      {/* <select {...field} {...rest} hidden></select> */}
      <span>
        <FaChevronDown />
      </span>
      <div className='dropdown__options-container'>
        <ul className='dropdown__options'>
          {options.map((option, index) => {
            if (option.value) {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection(option.value, option.label);
                  }}
                >
                  {option.label}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );

  //   return (
  //     <select {...field} {...rest}>
  //       {options.map((option, index) => {
  //         return (
  //           <option
  //             value={option.value}
  //             key={index}
  //             disabled={!option.value && required}
  //             hidden={!option.value && required}
  //           >
  //             {option.label}
  //           </option>
  //         );
  //       })}
  //     </select>
  //   );
};
