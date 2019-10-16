import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeDetailPage.css'
import ApiContext from '../ApiContext'
import ReviewForm from '../ReviewForm/ReviewForm'
import config from '../config'

class RecipeDetailPage extends Component {
   state = {
     recipe: {}
   }
   static defaultProps = {
     match: {
       params: {}
     }
   }
   static contextType = ApiContext
   componentDidMount() {
     setTimeout(() => { console.log(this.context) }, 3000)

   }
   _getRecipe() {
    let recipes = this.context.cocktails
    if (!recipes || recipes.length <= 0) return {}
    for(let i=0; i < recipes.length; i++) {
      if (recipes[i].id == this.props.match.params.recipeId) {
        console.log(recipes[i])
        let foundRecipe = recipes[i]
        if (!Array.isArray(foundRecipe.ingredients)) foundRecipe.ingredients = foundRecipe.ingredients.split(",")
        if (!Array.isArray(foundRecipe.steps)) foundRecipe.steps = foundRecipe.steps.split(",")
        if (!Array.isArray(foundRecipe.reviews)) foundRecipe.reviews = foundRecipe.reviews.split(",")
        return foundRecipe
      }
    }
  }

   render() {
   return (
     <div className='RecipeDetail'>
       <section className='ActualRecipe'>
         <h2>{this._getRecipe().name}</h2>
         <h3>Ingredients:</h3>
           <ul className='IngredientList'>
           {this._getRecipe() && this._getRecipe().ingredients && this._getRecipe().ingredients.map((ingredient, index) =>
           <li key={index}>
               {ingredient}
           </li>
           )}
           </ul>
         <h3>Steps:</h3>
         <ul className='IngredientList'>
         {this._getRecipe() && this._getRecipe().steps && this._getRecipe().steps.map((step, index) =>
           <li key={index}>
               {step}
           </li>
           )}
           </ul>
        </section>
         <Link to={`/editrecipe/${this._getRecipe().id}`}>
           <button>Edit Recipe</button>
         </Link>
        <section className="CurrentReviews">
         <h3>Reviews:</h3>
         {(!this._getRecipe() || !this._getRecipe().reviews || this._getRecipe().reviews.length <= 0 || this._getRecipe().reviews[0] == "") ? <p>Be the first to leave a review for this recipe!</p> :
         <ul className='ReviewList'>
         {this._getRecipe() && this._getRecipe().reviews && this._getRecipe().reviews.map((review, index) =>
           <li key={index}>
               {review}
           </li>
           )}
           </ul>
         }
        </section>
        <section className="ReviewForm">
          <ReviewForm />
        </section>
     </div>
   )
 }
}
export default RecipeDetailPage;