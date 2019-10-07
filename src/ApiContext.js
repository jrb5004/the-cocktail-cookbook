import React from 'react'

const ApiContext = React.createContext({
  categories: [],
  cocktails: [],
  addCocktail: () => {},
})

export default ApiContext