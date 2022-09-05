import React from 'react'
import { FaHome } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { GiClothes } from 'react-icons/gi'
import { IconBaseProps } from 'react-icons'

export const MenuSidebarData: {
  title: string
  path: string
  icon: IconBaseProps
  className: string
}[] = [
  { title: 'Home', path: '/', icon: <FaHome />, className: 'nav-text' },
  {
    title: 'Create set',
    path: '/createSet/shirt',
    icon: <AiOutlinePlus />,
    className: 'nav-text',
  },
  {
    title: 'Your sets',
    path: '/mySets',
    icon: <GiClothes />,
    className: 'nav-text',
  },
]
