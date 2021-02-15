import React, { FC } from 'react';

import './Input.module.scss';

interface Props {
  onChange: (value: string) => void;
  value?: string | number;
  className?: string;
  type?: string;
}

const Input: FC<Props> = ({
                            children,
                            onChange,
                            value,
                            className,
                            type = 'text',
                          }) => {
  return (
    <label className={className}>
      {children}
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type={type}
      />
    </label>
  );
}

export default Input;