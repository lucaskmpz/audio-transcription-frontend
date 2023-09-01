import axios from 'axios'
import { useState, useEffect } from 'react'
import './Button.css'

function Button({title, ...rest}) {

  return (
    <button type='button' className='button-main' {...rest}>{ title }</button>
  )
}

export default Button
