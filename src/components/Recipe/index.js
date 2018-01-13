import React from 'react';
import './style.css';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: null
    };
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  fetchRecipe() {
    fetch('/api/recipe')
    .then(response => response.json())
    .then(recipe => this.setState({ recipe }))
    .catch(error => console.log(error));
  }

  render() {
    console.log(this.state);
    const { recipe } = this.state;
    return recipe ? (
      <h1>{recipe.name}</h1>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default Recipe;