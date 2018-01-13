import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './components/App/';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <App>
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route path="/recipes/:id" component={Recipe} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </HashRouter>, 
  document.getElementById('root')
);
registerServiceWorker();
