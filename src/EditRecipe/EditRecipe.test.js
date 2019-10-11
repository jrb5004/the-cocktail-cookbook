import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditRecipe from './EditRecipe';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditRecipe />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});