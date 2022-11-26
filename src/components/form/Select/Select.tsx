import { useField } from 'formik';
import { FaChevronDown } from 'react-icons/fa';
import { FC, useCallback, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

type SelectProps = {
  name: string;
  required: boolean;
  options?: {
    value: string;
    label: string;
  }[];
};

const Select: FC<SelectProps> = (props) => {
  const [_, meta, helpers] = useField(props);
  const { options, required } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(
    options && options[0].label ? options[0].label : ''
  );

  const toggleShowOptions = () => {
    setShowOptions((v) => !v);
  };

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(
    ref,
    useCallback(() => {
      if (showOptions) {
        setShowOptions(false);
        if (!meta.touched) {
          helpers.setTouched(true);
        }
      }
    }, [showOptions])
  );

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
      <span>
        <FaChevronDown />
      </span>
      <div className='dropdown__options-container'>
        <ul className='dropdown__options'>
          {options.map((option, index) => {
            if (option.value || (option.value === '' && !required)) {
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
};

export default Select;
