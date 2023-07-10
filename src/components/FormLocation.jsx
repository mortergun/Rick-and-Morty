import getRandomNumber from "../utils/getRandomNumber"
import "./styles/FormLocation.css"

const FormLocation = ({ setIdLocation }) => {

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.inputId.value.trim()
    if (inputValue === '' || inputValue === 0){
      setIdLocation(getRandomNumber(126))
    } else {
      setIdLocation(e.target.inputId.value.trim())
    }
    e.target.inputId.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input id="inputId" className="form__input" type="text" />
      <button className="form__button">Search <i className='bx bx-search'></i></button>
    </form>
  )
}

export default FormLocation