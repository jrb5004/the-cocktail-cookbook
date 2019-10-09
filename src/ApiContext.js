import React from 'react'

const ApiContext = React.createContext({
  categories: [],
  cocktails: [],
  addCocktail: () => {},
  updateRecipe: () => {},
  addReview: () => {},
})

export default ApiContext