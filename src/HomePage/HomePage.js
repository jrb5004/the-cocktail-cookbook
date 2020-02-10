import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './HomePage.css'
import ApiContext from '../ApiContext'

var logoOne = require('../Images/Logo.png')
var logoTwo = require('../Images/cookbook.png')

class HomePage extends Component {
    static defaultProps = {
      match: {
        params: {}
      }
    }
    static contextType = ApiContext
    
    render() {
      const { categories=[] } = this.context
    return (
      <div className='HomePage'>
        <main className='outerWrapper'>
          <section className='Description'>
            <p><span className='TitleText'>The Cocktail Cookbook</span> provides the professional mixologist, the amatuer house-party bartender, and everyone inbetween, a convenient repository of cocktail recipes organized by category!</p>
            <p>View and edit recipes, add your own recipes to the collection, and leave comments with your feedback.</p>
          </section>
          <hr></hr>
          <section className='ViewCocktails' id='ViewCocktails'>
            <h2 className='CatTitle'>View Recipes!</h2>
            <div className = "LogoWrapper">
              <img src={logoOne} alt = 'cocktail logo' className = 'Logo' />
              <img src={logoTwo} alt = 'cookbook logo' className = 'Cookbook' />
            </div>
            <p>Select cocktail category below to view recipes and start mixin'!</p>
            <ul className='CatList'>
              {categories.map(cat =>
              <Link to={`/cat/${cat.id}`}>
                <li key={cat.id}>
                    <span>{cat.name}</span>
                </li>
              </Link>
              )}
            </ul>
          </section>
        </main>
        <hr></hr>
          <section className='AddRecipeHome'>
          <h2 className='CatTitle'>Add a Recipe to the Cookbook!</h2>
          <p className='AddRecipeParagraph'>Have a great recipe not found in the cookbook?</p>  
          <p className='AddRecipeParagraph'>Add it <Link to={`/addrecipe`}><span className='AddRecipeLink'>here.</span></Link></p>
        </section>
      </div>
    )
  }
}

export default HomePage;