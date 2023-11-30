const ButtonHandler = (props) => {  
    return (
        <button onClick={props.handlerClick}>
            {props.text}
        </button>
    )
}

export default ButtonHandler