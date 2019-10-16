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
          steps: [],
          newIngredient: '',
          newStep: ''
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

    handleUpdateRecipe = e => {
      e.preventDefault()
  
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
  
      fetch(`${BASE_URL}/api/cocktails/${recipeId}`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        },
        method: 'PATCH',
        body: JSON.stringify(body)
      })
  
        .then(res => {
          if (!res.ok)
            return (Promise.reject('Reject error'))
          return (res.json())
        })
        .then((resCocktail) => {
          this.context.updateRecipe(resCocktail)
        })
        .then(() => {
          {this.props.history.goBack()}
        })
        .catch(error => {
          console.error({ error })
        })
    }

    render() {
      const { name, ingredients, steps } = this.state
      return (
        <div className='AddEditRecipeForm'>
          <form onSubmit={this.handleUpdateRecipe}>
          <h2>Edit Recipe: {name}</h2>
          <div>
            <h4>Ingredients:</h4>
                <ol className='StepIngList'>
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
                placeholder='enter new ingredient'
                className='IngredientsInput'
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.addIngredient(event)
                  }
                }}
              />
              <button className='StepButton' onClick={e => this.addIngredient(e)}>SUBMIT</button>
          </div>
          <div>
              <h4>Steps:</h4>
              <ol className='StepIngList'>
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
              placeholder='enter new step'
              className='IngredientsInput'
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.addStep(event)
                }
              }}
            />
            <button className='StepButton' onClick={e => this.addStep(e)}>SUBMIT</button>
          </div>
          <button className='AddEditSubmitButton' type='submit'>Submit Recipe!</button>
        </form>
      </div>
      )
  }
}

export default withRouter(EditRecipe);