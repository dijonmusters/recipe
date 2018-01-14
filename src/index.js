import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './components/App/';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import NotFound from './components/NotFound';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MuiThemeProvider>
    <HashRouter>
      <App>
        <Switch>
          <Route exact path="/" component={RecipeList} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </HashRouter>
  </MuiThemeProvider>, 
  document.getElementById('root')
);
registerServiceWorker();
