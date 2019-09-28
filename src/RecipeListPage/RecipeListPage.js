import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import './RecipeListPage.css'

class RecipeListPage extends Component {
   constructor(props) {
     super(props)

     const selectedCat = this.props.match.params.catId  // "1"
     const cats = this.props.cats   // [{}, {}]

     let finalCat = {}
     for (let cat of cats) {
       if (cat.id == selectedCat) finalCat = cat
     }

     let recipes = this.props.recipes
     let finalRecipes = []
     for (let recipe of recipes) {
       if (recipe.categoryid == selectedCat) finalRecipes.push(recipe)
     }

     this.state = {
       cat: finalCat,
       catRecipes: finalRecipes
     }
   }
   
   render() {
   
   return (
     <div className='RecipeList'>
       <h2>{this.state.cat.name}</h2>
       <p>{this.state.cat.description}</p>
       <ul className='RecipeList'>
           {this.state.catRecipes.map(recipe =>
           <li key={recipe.id}>
               <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
           </li>
           )}
         </ul>
       <p>Have a great {this.state.cat.name} recipe not listed above?  Add it to the collection <Link to={`/addrecipe`}>here</Link>.</p>
     </div>
   )
 }
}
export default RecipeListPage;