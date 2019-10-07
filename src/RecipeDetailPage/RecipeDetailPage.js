import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeDetailPage.css'
import ApiContext from '../ApiContext'



class RecipeDetailPage extends Component {
    static defaultProps = {
      match: {
        params: {}
      }
    }
    static contextType = ApiContext  
  
    render() {
      const selectedRec = this.props.match.params.recipeId  
      const { cocktails } = this.context
     
      let finalRecipe = {}
      for (let recipe of cocktails) {
        if (recipe.id == selectedRec) finalRecipe = recipe
      } 

      console.log(this.context)
      console.log(finalRecipe)

    return (
      <div className='RecipeDetail'>
          <h2>{finalRecipe.name}</h2>
          <h3>Ingredients:</h3>
            <ul className='IngredientList'>
            {finalRecipe && finalRecipe.ingredients && finalRecipe.ingredients.split(",").map(ingredient =>
            <li key={ingredient.id}>
                {ingredient}
            </li>
            )}
            </ul>
          <h3>Steps:</h3>
          <ul className='IngredientList'>
          {finalRecipe && finalRecipe.steps && finalRecipe.steps.split(",").map(step =>
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
          <Link to={`/editrecipe/${selectedRec}`}>
            Edit Recipe
          </Link>
      </div>
    )
  }
}

export default RecipeDetailPage;