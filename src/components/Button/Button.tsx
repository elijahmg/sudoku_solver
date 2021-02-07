import React, { FC } from 'react';

import './Button.scss';

interface ButtonProps {
  className?: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
