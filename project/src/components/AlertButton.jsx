import PropTypes from 'prop-types';

function AlertButton({
  handleClick,
  message,
  children,
  styles,
}) {
  
  const defaultHandleClick = () => {
    if (message) {
      alert(message);
    } else {
      console.warn('No message provided for AlertButton');
    }
  };

  
  const onClick = handleClick || defaultHandleClick;

  return (
    <button onClick={onClick} className="button" style={styles}>
      {children}
    </button>
  );
}


AlertButton.propTypes = {
  handleClick: PropTypes.func,
  message: PropTypes.string,
  children: PropTypes.node.isRequired,
  styles: PropTypes.object,
};

export { AlertButton };
