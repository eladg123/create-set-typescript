import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuSidebarData } from '../utils/MenuSidebarData'
import { AiOutlineClose } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'
import '../css/navbar.css'

const Navbar = () => {
  const [menuSidebar, setMenuSidebar] = useState<Boolean>(false)
  const showMenuSidebar = () => {
    setMenuSidebar(!menuSidebar)
  }
  return (
    <header>
      <div className="navbar">
        <Link to="#" className="menu-icon">
          <FaBars size={40} onClick={showMenuSidebar} />
        </Link>
        <h3 className="title">Create set</h3>
      </div>
      <nav className={menuSidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showMenuSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="x-icon">
              <AiOutlineClose />
            </Link>
          </li>
          {MenuSidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  <>
                    {item.icon}
                    <span>{item.title}</span>
                  </>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
