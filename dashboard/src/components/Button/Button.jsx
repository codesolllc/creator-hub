
const Button = ({type, text, action}) => {
  return (
    <button className={`${type}`} onClick={action}>
      {text}
    </button>
  )
}

export default Button
