import style from './RegisterButton.module.scss';

function RegisterButton({ children, ...props }) {
  return (
    <button className={style.registerButton} type="submit" {...props}>
      {children}
    </button>
  );
}

export default RegisterButton;
