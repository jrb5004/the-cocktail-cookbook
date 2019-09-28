import React, {Component} from 'react'
import './AddRecipe.css'



class AddRecipe extends Component {

    render() {
    
    return (
      <div className='EditRecipe'>
          <form>
          <h2>Add New Recipe</h2>
          <div>
            <select name="category">
              <p>Select Category</p>
              <option value="highballs">Highballs</option>
              <option value="sours">Sours</option>
              <option value="stirred">Stirred</option>
              <option value="flips fizzes others">Flips, Fizzes and Others</option>
            </select><br></br>
            <label htmlFor="name">Cocktail Name:</label>
            <input type="text" name='name' id='name' />
          </div>
          <div>
            <label htmlFor="name">Ingredients:</label>
            <input type="text" name='ingredients' id='ingredients' />
          </div>
          <div>
            <label htmlFor="steps">Steps:</label>
            <input type="text" name='stpes' id='steps' />
          </div>
          <button type="submit">Submit Recipe!</button>
        </form>
      </div>
    )
  }
}

export default AddRecipe;