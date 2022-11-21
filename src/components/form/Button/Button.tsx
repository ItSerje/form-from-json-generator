import { FC } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  value: string;
};

const Button: FC<ButtonProps> = ({
  type = 'button',
  disabled = false,
  onClick,
  value,
}) => {
  return (
    <button
      className='btn btn--rounded btn--floating'
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
