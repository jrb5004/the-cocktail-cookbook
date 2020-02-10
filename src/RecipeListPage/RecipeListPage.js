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

  componentDidMount() {
    window.scrollTo(0, 0)
  }
   
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
        <h2 className='RecipeName'>{finalCat.name}</h2>
        <p className='RecipeDesc'>{finalCat.description}</p>
        <ul className='RecipeListMain'>
            {finalRecipes.map(cocktail =>
                <Link to={`/recipe/${cocktail.id}`}>
                <li key={cocktail.id}>
                  <span>{cocktail.name}</span>
                </li>
            </Link>
            )}
          </ul>
        <p className='AddCatRecipe'>Have a great {finalCat.name} recipe not listed above?  Add it to the collection <Link to={`/addrecipe`}><span className='AddRecipeLink'>here</span>.</Link></p>
      </div>
    )
 }
}
export default RecipeListPage;