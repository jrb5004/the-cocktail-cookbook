import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


var Logo = require('../Images/Logo.png')
var Cookbook = require('../Images/cookbook.png')

class Header extends Component {
  render() {
    return (
      <section className='Header'>
          <Link to={`/`}>
          <h1>The Cocktail Cookbook</h1>
          </Link>
          <div className = "logos">
            <img src={Logo} alt="drink logo" />
            <span>|</span>
            <img src={Cookbook} alt="cookbook logo" />
          </div>
      </section>
    )
  }
}

export default Header;