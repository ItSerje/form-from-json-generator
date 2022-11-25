import { FC } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  value: string;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type = 'button',
  disabled = false,
  onClick,
  value,
  className
}) => {
  return (
    <button
      className={'btn btn--rounded btn--floating' + (className ? ` ${className}` : '')}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
