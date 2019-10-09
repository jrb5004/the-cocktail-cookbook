import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeDetailPage.css'
import ApiContext from '../ApiContext'
import ReviewForm from '../ReviewForm/ReviewForm'


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
            {finalRecipe && finalRecipe.ingredients && finalRecipe.ingredients.split(",").map((ingredient, index) =>
            <li key={index}>
                {ingredient}
            </li>
            )}
            </ul>
          <h3>Steps:</h3>
          <ul className='IngredientList'>
          {finalRecipe && finalRecipe.steps && finalRecipe.steps.split(",").map((step, index) =>
            <li key={index}>
                {step}
            </li>
            )}
            </ul>
          <Link to={`/editrecipe/${selectedRec}`}>
            <button>Edit Recipe</button>
          </Link>
          <h3>Reviews:</h3>
          <ul className='ReviewList'>
          {finalRecipe && finalRecipe.reviews && finalRecipe.reviews.split(",").map((review, index) =>
            <li key={index}>
                {review}
            </li>
            )}
            </ul>
          <div className="ReviewForm">
            <ReviewForm />
          </div>
      </div>
    )
  }
}

export default RecipeDetailPage;