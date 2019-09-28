import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import RecipeListPage from './RecipeListPage/RecipeListPage';
import RecipeDetailPage from './RecipeDetailPage/RecipeDetailPage';
import EditRecipe from './EditRecipe/EditRecipe';
import AddRecipe from './AddRecipe/AddRecipe';
//import ApiContext from '../ApiContext';
//import ApiError from '../ApiError';
//import config from '../config';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Header />
          <main>
            <Route exact path="/" render={()=><HomePage cats={this.props.cats} recipes={this.props.recipes}/>} />
            <Route path="/cat/:catId" render={(props)=><RecipeListPage cats={this.props.cats} recipes={this.props.recipes} {...props} />} />
            <Route path="/recipe/:recipeId" render={(props)=><RecipeDetailPage cats={this.props.cats} recipes={this.props.recipes} {...props} />} />
            <Route path="/editrecipe/:recipeId" render={(props)=><EditRecipe cats={this.props.cats} recipes={this.props.recipes} {...props} />} />
            <Route path="/addrecipe" render={(props)=><AddRecipe cats={this.props.cats} recipes={this.props.recipes} {...props} />} />
          </main>
          <Footer />
      </div>
    );
  } 
}

export default App;