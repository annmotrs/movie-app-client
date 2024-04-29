import React from 'react';
import style from './RegisterInput.module.scss';

const RegisterInput = React.forwardRef(
  ({ type, name, title, ...props }, ref) => (
    <div className={style.registerInput}>
      <input
        className={style.registerInput__input}
        type={type}
        name={name}
        id={name}
        placeholder=" "
        {...props}
        ref={ref}
      />
      <label htmlFor={name} className={style.registerInput__label}>
        {title}
      </label>
    </div>
  )
);

export default RegisterInput;
