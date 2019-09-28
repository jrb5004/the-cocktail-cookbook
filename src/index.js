import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css';

const CATS = [
    {"id": 1, 
    "name": "Highballs",
    "description": "Classic and iconic, highball cocktails most often feature a flavorful base spirit with club soda and served over ice in a tall glass - thus the name!"
    },
    {"id": 2,
     "name": "Sours",
     "description": "Remember these party favorite cocktails are typically shaken, not stirred. Featuring sweet and acidic notes, sours can be made on the rocks or straight up!"
    },
    {"id": 3,
    "name": "Stirred",
    "description": "The 'Stirred' family of cockstails feature classic and straight-forward cocktails built around a base spirit and dressed up with subtle sweeteners.  And it goes without saying -- stir, don't shake!"
    },
    {"id": 4, 
    "name": "Flips, Fizzes and Other Craft Creations",
    "description": "With the today's bar scene exploding with new craft cocktails, fizzes and flips are making a comeback.  Get creative and create your own eye-catching cocktail!"
    },
]

const RECIPES = [
    {
        "id": 1, 
        "name": "Whiskey Sour",
        "categoryid": 2,
        "ingredients": ["2 oz Bourbon", "2 teaspoons simple syrup", "3 dashes bitters", "orange peel for garnish (optional)"],
        "steps": ["Combine ingredients into a shaker along with ice.", "Shake vigorously for about 15-20 seconds.", "Strain into an old-fashioned or rocks glass with ice.", "Garnish with orange wheel and/or a cherry. (optional)"]
    },
    {
        "id": 2, 
        "name": "Old Fashioned",
        "categoryid": 3,
        "ingredients": ["2 oz Bourbon or Rye whiskey", "3/4 oz lemon juice", "1/2 oz simple syrup", "1/2 oz egg white (optional)"],
        "steps": ["Add all ingredients to a rocks glass.", "Add 1-3 large pieces of ice and stir for 20 seconds."]
    },
    {
        "id": 3, 
        "name": "Mojito",
        "categoryid": 1,
        "ingredients": ["1.5 oz white rum", "1/2 cup club soda", "3/4 oz lime juice", "6 mint leaves"],
        "steps": ["Add all ingredients except club soda to a cocktail shaker.", "Add 2-3 cubes of ice and shake for 1-15 seconds.", "Strain into a highball glass filled with crushed ice.", "Top with club soda and stir.", "Optionally garnish with mint sprig."]
    },
    {
        "id": 4, 
        "name": "Gin Fizz",
        "categoryid": 4,
        "ingredients": ["2 oz gin", "3/4 oz simple syrup", "1 oz lemon juice", "1/2 oz egg white", "1 oz club soda"],
        "steps": ["Add all ingredients except club soda to a cocktail shaker and dry shake for 10 seconds.", "Add 2-3 cubes of ice and shake vigorously.", "Double-strain into a chilled fizz glass and top with club soda."]
    }
]


ReactDOM.render(
    <BrowserRouter>
      <App cats={CATS} recipes={RECIPES} />
    </BrowserRouter>,
    document.getElementById('root')
  )
