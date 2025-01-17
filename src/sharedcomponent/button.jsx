


function Button(props) {
    const buttonClasses = `Button ${props.color} ${props.size} ${props.type}`;

    return (
      <button className={buttonClasses} onClick={() =>props.onClick()}>
        {props.value}
      </button>
    );
}

export default Button;