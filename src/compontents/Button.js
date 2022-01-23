import PropType from 'prop-types'
import React from 'react'

const Button = ({color, text, onClick}) => {

   return (
	<button  style={{ backgroundColor: color}} onClick= {onClick} className='btn'>{text}</button>
  )

}


Button.propTypes = {
	text: PropType.string,
}

Button.defaultProps = {  
	color: 'steelblue'
}
export default Button
 