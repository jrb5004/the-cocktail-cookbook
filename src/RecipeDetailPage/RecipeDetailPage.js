import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeDetailPage.css'
import ApiContext from '../ApiContext'
import ReviewForm from '../ReviewForm/ReviewForm'
import config from '../config'
const BASE_URL = 'https://damp-reaches-42499.herokuapp.com'



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
      console.log('I am running')
      fetch(`${BASE_URL}/api/cocktails/${this.props.match.params.recipeId}`, 
      {headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }})
      .then(res => {
        if (!res.ok)
              return res.json().then(e => Promise.reject(e));
  
          return res.json();
      })
      .then((cocktail) => {   
        this.setState({recipe: cocktail})
        console.log(this.state)
      })
      .catch(error => {
          console.error({error});
      });
      }
    
  
    render() {

    const {recipe} = this.state
    return (
      <div className='RecipeDetail'>
          <h2>{recipe.name}</h2>
          <h3>Ingredients:</h3>
            <ul className='IngredientList'>
            {recipe && recipe.ingredients && recipe.ingredients.split(",").map((ingredient, index) =>
            <li key={index}>
                {ingredient}
            </li>
            )}
            </ul>
          <h3>Steps:</h3>
          <ul className='IngredientList'>
          {recipe && recipe.steps && recipe.steps.split(",").map((step, index) =>
            <li key={index}>
                {step}
            </li>
            )}
            </ul>
          <Link to={`/editrecipe/${recipe.id}`}>
            <button>Edit Recipe</button>
          </Link>
          <h3>Reviews:</h3>
          <ul className='ReviewList'>
          {recipe && recipe.reviews && recipe.reviews.split(",").map((review, index) =>
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