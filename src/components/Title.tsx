import React from 'react'
import '../css/title.css'

interface Props {
  title: string
}

const Title = ({ title }: Props) => {
  return <h1 className="mini-title">{title}</h1>
}

export default Title
