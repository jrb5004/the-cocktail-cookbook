import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

var logoOne = require('../Images/Logo.png')
var logoTwo = require('../Images/cookbook.png')

class Header extends Component {
  render() {
    return (
      <section className='Header'>
          <Link to={`/`}>
            <h1>The Cocktail Cookbook</h1>
          </Link>
      </section>
    )
  }
}

export default Header;