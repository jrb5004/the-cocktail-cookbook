import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeListPage.css'
import ApiContext from '../ApiContext'

class RecipeListPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext
   
  render() {
    let selectedCat = this.props.match.params.catId
    const { categories, cocktails } = this.context

    let finalCat ={}
    for (let cat of categories) {
      if (cat.id == selectedCat) finalCat=cat
    }

    let finalRecipes = []
    for (let recipe of cocktails) {
      if (recipe.category_id == selectedCat) finalRecipes.push(recipe)
    }

    return (
      <div className='RecipeList'>
        <h2>{finalCat.name}</h2>
        <p>{finalCat.description}</p>
        <ul className='RecipeList'>
            {finalRecipes.map(cocktail =>
            <li key={cocktail.id}>
                <Link to={`/recipe/${cocktail.id}`}>{cocktail.name}</Link>
            </li>
            )}
          </ul>
        <p>Have a great {finalCat.name} recipe not listed above?  Add it to the collection <Link to={`/addrecipe`}>here</Link>.</p>
      </div>
    )
 }
}
export default RecipeListPage;