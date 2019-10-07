import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './HomePage.css'
import ApiContext from '../ApiContext'



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
        <section className='Description'>
          <p>The Cocktail Cookbook provides the professional mixologist, the amatuer house-party bartender, and everyone inbetween, a convenient repository of cocktail recipes organized by category!</p>
          <p>View and edit recipes, add your own recipes to the collection, and leave comments with your feedback/rating.</p>
        </section>
        <section className='ViewCocktails'>
          <h2>View Recipes!</h2>
          <p>Select cocktail category below to view recipes and start mixin'!</p>
          <ul className='CatList'>
            {categories.map(cat =>
            <li key={cat.id}>
                <Link to={`/cat/${cat.id}`}>{cat.name}</Link>
            </li>
            )}
          </ul>
        </section>
        <section>
        <p className="AddRecipe">Have a great recipe not found in the cookbook?  Add it <Link to={`/addrecipe`}>here</Link>.</p>
      </section>
      </div>
    )
  }
}

export default HomePage;