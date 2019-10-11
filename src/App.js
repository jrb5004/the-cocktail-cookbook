import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import RecipeListPage from './RecipeListPage/RecipeListPage';
import RecipeDetailPage from './RecipeDetailPage/RecipeDetailPage';
import EditRecipe from './EditRecipe/EditRecipe';
import AddRecipe from './AddRecipe/AddRecipe';
import ApiContext from './ApiContext';
//import ApiError from '../ApiError';
import config from './config';
import './App.css';
const BASE_URL = 'https://damp-reaches-42499.herokuapp.com'


class App extends Component {
  state = {
    categories: [],
    cocktails: []
  };

  componentDidMount() {
    Promise.all([
        fetch(`${BASE_URL}/api/categories`, {headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
          }}),
        fetch(`${BASE_URL}/api/cocktails`, {headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
          }})
    ])
        .then(([catsRes, cocktailsRes]) => {
            if (!catsRes.ok)
                return catsRes.json().then(e => Promise.reject(e));
            if (!cocktailsRes.ok)
                return cocktailsRes.json().then(e => Promise.reject(e));

            return Promise.all([catsRes.json(), cocktailsRes.json()]);
        })
        .then(([categories, cocktails]) => {
            //console.log(categories, cocktails)
            this.setState({categories, cocktails});
        })
        //.then(console.log(this.state))
        .catch(error => {
            console.error({error});
        });
  }


  addCocktail = newCocktail => {
    console.log(this.state.cocktails)
    this.setState({
      cocktails: [...this.state.cocktails, newCocktail]
    }, 
    console.log(this.state.cocktails)
)}

  updateRecipe = updatedCocktail => {
    console.log(updatedCocktail)
    const newCocktails = this.state.cocktails.map(cocktail =>
        (cocktail.id === updatedCocktail.id)
            ? updatedCocktail
            : cocktail
    )
    this.setState({
        cocktails: newCocktails
    })
}

  render() {
    const value = {
      categories: this.state.categories,
      cocktails: this.state.cocktails,
      addCocktail: this.addCocktail,
      updateCocktai: this.updateRecipe
  };
    return (
      <ApiContext.Provider value={{...this.state, addCocktail: this.addCocktail, updateRecipe: this.updateRecipe, addReview: this.addReview}}>
        <div className="App">
            <Header />
            <main>
              <Route exact path="/" component = {HomePage} />
              <Route path="/cat/:catId" component = {RecipeListPage} />
              <Route path="/recipe/:recipeId" component = {RecipeDetailPage} />
              <Route path="/editrecipe/:recipeId" component = {EditRecipe} />
              <Route path="/addrecipe" component = {AddRecipe} />
            </main>
            <Footer />
        </div>
      </ApiContext.Provider>
    );
  } 
}

export default App;