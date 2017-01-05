import React from 'react';

const Button = ({icon, iconPosition, modifiers, handler, children}) => {
  return(
    <a className={`button ${modifiers}`} onClick={handler}>
      {icon !== '' && iconPosition === 'left' &&
        <span className="icon">
          <i className={icon}></i>
        </span>
      }
      <span>{children}</span>
      {icon !== '' && iconPosition === 'right' &&
        <span className="icon">
          <i className={icon}></i>
        </span>
      }
    </a>
  )
}

Button.defaultProps = {
  icon: '',
  iconPosition: 'left',
  modifiers: '',
  handler: () => {},
}

export default Button;