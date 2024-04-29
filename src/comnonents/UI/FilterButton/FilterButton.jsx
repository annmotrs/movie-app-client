import style from './FilterButton.module.scss';

function FilterButton({ children, isActive, id, ...props }) {
  return (
    <button
      className={`${style.filterButton} ${isActive === id && style.active}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default FilterButton;
