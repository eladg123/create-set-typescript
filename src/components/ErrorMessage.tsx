import React from 'react'
import '../css/error.css'

interface Props {
  message: string | null
}

const ErrorMessage = ({ message }: Props) => {
  return <div className="err-msg">{message ? message : null}</div>
}

export default ErrorMessage
