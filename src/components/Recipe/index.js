import React from 'react';
import _ from 'lodash';
import './style.css';

class Recipe extends React.Component {

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
    const { id } = this.props.match.params
    fetch(`/api/recipes/${id}`)
    .then(response => response.json())
    .then(recipe => {
      this.setState({ recipe })
    })
    .catch(error => console.log(error));
  }

  renderIngredient(ingredient) {
    return (
      <p key={_.uniqueId()}>
        { ingredient }
      </p>
    );
  }

  renderInstruction(instruction) {
    return (
      <p key={_.uniqueId()}>
        { instruction }
      </p>
    );
  }

  renderRecipe(recipe) {
    return (
      <div key={_.uniqueId()}>
        <h1>{ recipe.name }</h1>
        <p>prep: { recipe.prep } + cook: { recipe.cook } = {recipe.prep + recipe.cook} minutes</p>
        <div className="split">
          <h2>Ingredients</h2>
          { recipe.ingredients.map(ingredient => this.renderIngredient(ingredient)) }
        </div>
        <div className="split">
          <h2>Instructions</h2>
          { recipe.instructions.map(instruction => this.renderInstruction(instruction)) }
        </div>
      </div>
    );
  }

  render() {
    const { recipe } = this.state;
    return recipe ? (
      this.renderRecipe(recipe)
    ) : <div>loading...</div>;
  }
}

export default Recipe;