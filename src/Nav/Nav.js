import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

var hamburger = require('../Images/hamburger.png')


class Header extends Component {

  toggleMobileDropdown() {
    var x = document.getElementById("Dropdown");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  render() {
    return (
      <nav className='Navigation'>
          <div className='NavLinks' onClick={() => this.toggleMobileDropdown()}>
            <a href='#ViewCocktails'>View Recipes</a>
            <Link to={`/addrecipe`}>Add Your Own</Link>
            <a href='mailto:jrb5004@gmail.com'>Contact</a>
          </div>
          <div className='Hamburger'>
            <img src={hamburger} alt ='hamburger icon' onClick={() => this.toggleMobileDropdown()}/>
          </div>
          <div id='Dropdown'>
              <a href='#ViewCocktails'>View Recipes</a>
              <Link to={`/addrecipe`}>Add Your Own</Link>
              <a href='mailto:jrb5004@gmail.com'>Contact</a>
          </div>
      </nav>
    )
  }
}

export default Header;