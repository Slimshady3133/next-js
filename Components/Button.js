import clsx from 'clsx';

function Button({ href, color, size, block, children, onClick }) {
  const buttonClasses = clsx('btn', `btn-${color}`, `btn-${size}`, {
    'btn-block': block,
  });

  return href ? (
    <a href={href} className={buttonClasses} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
