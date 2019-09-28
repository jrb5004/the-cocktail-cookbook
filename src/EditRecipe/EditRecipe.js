import React, {Component} from 'react'
import './EditRecipe.css'



class EditRecipe extends Component {

    render() {
    
    return (
      <div className='EditRecipe'>
          <form>
          <h2>Edit Recipe</h2>
          <div>
            <label htmlFor="name">Cocktail Name:</label>
            <input type="text" name='name' id='name' value="Whiskey Sour" />
          </div>
          <div>
            <label htmlFor="name">Ingredients:</label>
            <input type="text" name='ingredients' id='ingredients' value="2 oz Bourbon, 3/4 oz lemon juice, etc" />
          </div>
          <div>
            <label htmlFor="steps">Steps:</label>
            <input type="text" name='stpes' id='steps' value="Combine ingredients into a shaker along with ice, step 2, step 3" />
          </div>
          <button type="submit">Submit Update!</button>
        </form>
      </div>
    )
  }
}

export default EditRecipe;