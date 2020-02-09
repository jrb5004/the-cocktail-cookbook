import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'


class Header extends Component {
  render() {
    return (
      <nav className='Navigation'>
          <Link to={`/`}>View Recipes</Link>
          <Link to={`/`}>Add Your Own</Link>
          <Link to={`/`}>Contact</Link>
      </nav>
    )
  }
}

export default Header;