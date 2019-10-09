import React, {Component} from 'react'
import { withRouter } from "react-router-dom"
import './AddRecipe.css'
import ApiContext from '../ApiContext'
import config from '../config'
const BASE_URL = 'https://damp-reaches-42499.herokuapp.com'



class AddRecipe extends Component {
    static defaultProps ={
      addCocktail: () => {},
    }

    static contextType = ApiContext;

    constructor() {
      super();
      this.state = {
          name: '',
          category_id: '',
          ingredients: [],
          steps: [],
          reviews: []
      }
      this.handleAddRecipe = this.handleAddRecipe.bind(this)
    } 

    convertCategoryName(name) {
      if (name === "highballs") return 1;
      else if (name === "sours") return 2;
      else if (name === "stirred") return 3;
      else if (name === "flips fizzes others") return 4;
    } 

    setName(event) {
      this.setState({
          name:event.target.value
      })
    }

    setCategory(event) {
      let name = event.target.value
      let convertedName = this.convertCategoryName(name)
      this.setState({
          category_id: convertedName
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

    handleAddRecipe = e => {
      e.preventDefault()
  
      if (!this.state.name || this.state.name.trim() == '') { 
        alert('name is required') 
        return 
      }
  
      let body = {
        name: this.state.name,
        category_id: this.state.category_id,
        ingredients: this.state.ingredients,
        steps: this.state.steps,
        reviews: this.state.reviews
      }
      
      fetch(`${BASE_URL}/api/cocktails`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        },
        body: JSON.stringify(body)
       
      })
      
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then((cocktail) => {
          this.context.addCocktail(cocktail)
          this.props.history.push("/")
        })
        .catch(error => {
          console.error({ error })
        })
    }

    render() {
    
    return (
      <div className='EditRecipe'>
          <form onSubmit={this.handleAddRecipe}>
          <h2>Add New Recipe</h2>
          <div>
            <p>Select Category</p>
            <select name="category" onChange={(e) => this.setCategory(e)} >
              <option> Select a Category </option>
              <option value="highballs">Highballs</option>
              <option value="sours">Sours</option>
              <option value="stirred">Stirred</option>
              <option value="flips fizzes others">Flips, Fizzes and Others</option>
            </select><br></br>
            <label htmlFor="name">Cocktail Name:</label>
            <input type="text" name='name' id='name' onChange={(e) => this.setName(e)} required/>
          </div>
          <div>
            <label htmlFor="name">Ingredients:</label>
            <input type="text" name='ingredients' id='ingredients' onChange={(e) => this.setIngredients(e)} />
          </div>
          <div>
            <label htmlFor="steps">Steps:</label>
            <input type="text" name='stpes' id='steps' onChange={(e) => this.setSteps(e)} />
          </div>
          <button type="submit">Submit Recipe!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(AddRecipe);