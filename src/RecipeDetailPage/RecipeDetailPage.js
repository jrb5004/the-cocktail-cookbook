import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeDetailPage.css'



class RecipeDetailPage extends Component {
    constructor(props) {
        super(props)
        const selectedRec = this.props.match.params.recipeId  
        const recipes = this.props.recipes   // [{}, {}]
        let finalRecipe = {}
        for (let recipe of recipes) {
          if (recipe.id == selectedRec) finalRecipe = recipe
        }
        this.state = {
          recipe: finalRecipe
        }
      }
 
    render() {
    const recipeid = this.props.match.params.recipeId
    return (
      <div className='RecipeDetail'>
          <h2>{this.state.recipe.name}</h2>
          <h3>Ingredients:</h3>
            <ul className='IngredientList'>
            {this.state.recipe.ingredients.map(ingredient =>
            <li key={ingredient.id}>
                {ingredient}
            </li>
            )}
            </ul>
          <h3>Steps:</h3>
          <ul className='IngredientList'>
            {this.state.recipe.steps.map(step =>
            <li key={step.id}>
                {step}
            </li>
            )}
            </ul>
          <h3>Reviews:</h3>
          <form>
              <label>Leave a Review</label>
              <input type="text" placeholder="leave a review here"></input>
          </form>
          <Link to={`/editrecipe/${recipeid}`}>
            Edit Recipe
          </Link>
      </div>
    )
  }
}

export default RecipeDetailPage;