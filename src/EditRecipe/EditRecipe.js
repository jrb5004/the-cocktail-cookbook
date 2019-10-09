import React, {Component} from 'react'
import { withRouter } from "react-router-dom"
import './EditRecipe.css'
import ApiContext from '../ApiContext'
import config from '../config'
const BASE_URL = 'https://damp-reaches-42499.herokuapp.com'


class EditRecipe extends Component {
    static defaultProps ={
      updateRecipe: () => {},
    }

    static contextType = ApiContext;

    constructor() {
      super();
      this.state = {
          name: '',
          ingredients: [],
          steps: []
      }
      this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this)
    } 

    componentDidMount() {
      const { recipeId } = this.props.match.params
      fetch(`${BASE_URL}/api/cocktails/${recipeId}`, 
      {headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }})
      .then((cocktailsRes) => {
          if (!cocktailsRes.ok)
              return cocktailsRes.json().then(e => Promise.reject(e));
  
          return cocktailsRes.json();
      })
      .then((cocktails) => {
        cocktails.steps = cocktails.steps.split(',')
        cocktails.ingredients = cocktails.ingredients.split(',')   
        this.setState({ ...cocktails})
        console.log(this.state)
      })
      .catch(error => {
          console.error({error});
      });
    }

    setName(event) {
      this.setState({
          name:event.target.value
      })
    }

    setIngredients(event) {
      this.setState({
          ingredients:event.target.value.split(",")
      })
    }

    setSteps(event) {
      this.setState({
          steps:event.target.value.split(",")
      })
    }

    handleUpdateRecipe = e => {
      e.preventDefault()
      console.log (this.state)
  
      const { recipeId } = this.props.match.params
  
      if (!this.state.name || this.state.name.trim() == '') { 
        alert('name is required') 
        return 
      }
  
      let body = {
        name: this.state.name,
        ingredients: this.state.ingredients,
        steps: this.state.steps
      }
  
      console.log(body)
  
  
      fetch(`${BASE_URL}/api/cocktails/${recipeId}`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        },
        method: 'PATCH',
        body: JSON.stringify(body)
      })
  
        .then(res => {
          console.log(res)
          if (!res.ok)
            return (Promise.reject('Reject error'))
          return 
        })
        .then(() => {
          this.context.updateRecipe(recipeId)
          this.props.history.goBack()
        })
        .catch(error => {
          console.error({ error })
        })
    }

    render() {
      const { name, ingredients, steps } = this.state
      return (
        <div className='EditRecipe'>
            <form onSubmit={this.handleUpdateRecipe}>
            <h2>Edit Recipe</h2>
            <div>
              <label htmlFor="name">Cocktail Name:</label>
              <input type="text" name='name' id='name' value= {name} onChange={(e) => this.setName(e)} required/>
            </div>
            <div>
              <label htmlFor="name">Ingredients:</label>
              <input type="text" name='ingredients' id='ingredients' value= {ingredients} onChange={(e) => this.setIngredients(e)} required/>
            </div>
            <div>
              <label htmlFor="steps">Steps:</label>
              <input type="text" name='steps' id='steps' value={steps} onChange={(e) => this.setSteps(e)} required/>
            </div>
            <button type="submit">Submit Update!</button>
          </form>
        </div>
      )
  }
}

export default withRouter(EditRecipe);