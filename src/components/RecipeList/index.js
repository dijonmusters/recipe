import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import _ from 'lodash';
import './style.css';

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: null
    };
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  fetchRecipe() {
    axios.get('/api/recipes')
    .then(response => response.data)
    .then(recipes => {
      this.setState({ recipes })
    })
    .catch(error => console.log(error));
  }

  renderRecipe(recipe) {
    return (
      <div key={_.uniqueId()}>
        <h1><Link to={`/recipes/${recipe._id}`}>{ recipe.name }</Link></h1>
        <p>prep: { recipe.prep } | cook: { recipe.cook }</p>
      </div>
    );
  }

  render() {
    const { recipes } = this.state;
    return recipes ? (
      <div>
        <Link to='/recipes/add'><RaisedButton>add recipe</RaisedButton></Link>
        { recipes.map(recipe => this.renderRecipe(recipe)) }
      </div>
    ) : <div>loading...</div>;
  }
}

export default RecipeList;