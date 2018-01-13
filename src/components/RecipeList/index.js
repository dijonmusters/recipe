import React from 'react';
import { Link } from 'react-router-dom'
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
    fetch('/api/recipes')
    .then(response => response.json())
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
      recipes.map(recipe => this.renderRecipe(recipe))
    ) : <div>loading...</div>;
  }
}

export default RecipeList;