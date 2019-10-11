import React, {Component} from 'react'
import { withRouter } from "react-router-dom"
import './AddRecipe.css'
import ApiContext from '../ApiContext'
import config from '../config'
const BASE_URL = 'http://localhost:8000'



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
          reviews: [],
          newIngredient: '',
          newStep: ''
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

    addStep(e) {
      e.preventDefault();
      this.setState({
        steps: [...this.state.steps, this.state.newStep],
        newStep: ''
      });
    }

    removeStep(index) {
      let temp = this.state.steps;
      temp.splice(index, 1);
      this.setState({
        steps: temp
      });
    }

    addIngredient(e) {
      e.preventDefault();
      this.setState({
        ingredients: [...this.state.ingredients, this.state.newIngredient],
        newIngredient: ''
      });
    }

    removeIngredient(index) {
      let temp = this.state.ingredients;
      temp.splice(index, 1);
      this.setState({
        ingredients: temp
      });
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
            <p>Select Category:</p>
            <select name="category" onChange={(e) => this.setCategory(e)} >
              <option> Select a Category </option>
              <option value="highballs">Highballs</option>
              <option value="sours">Sours</option>
              <option value="stirred">Stirred</option>
              <option value="flips fizzes others">Flips, Fizzes and Others</option>
            </select><br></br>
            <label htmlFor="name">Cocktail Name:</label>
            <input className='NameInput' type="text" name='name' id='name' onChange={(e) => this.setName(e)} required/>
          </div>
          <div>
            <h4>Ingredients:</h4>
                <ol>
                {this.state.ingredients.map((ingredient, index) => {
                  return (
                    <li key={index}>
                      {ingredient} <p onClick={() => this.removeIngredient(index)}>X</p>
                    </li>
                  );
                })}
              </ol>
              <input
                value={this.state.newIngredient}
                onChange={e => this.setState({ newIngredient: e.target.value })}
                placeholder="enter new ingredient"
                className='IngredientsInput'
                required
              />
              <button className='StepButton' onClick={e => this.addIngredient(e)}>SUBMIT</button>
          </div>
          <div>
              <h4>Steps:</h4>
              <ol>
              {this.state.steps.map((step, index) => {
                return (
                  <li key={index}>
                    {step} <p onClick={() => this.removeStep(index)}>X</p>
                  </li>
                );
              })}
            </ol>
            <input
              value={this.state.newStep}
              onChange={e => this.setState({ newStep: e.target.value })}
              placeholder="enter new step"
              className='IngredientsInput'
              required
            />
            <button className='StepButton' onClick={e => this.addStep(e)}>SUBMIT</button>
          </div>
          <button type="submit">Submit Recipe!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(AddRecipe);