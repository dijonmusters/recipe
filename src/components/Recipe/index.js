import React from 'react';
import axios from 'axios';
import converter from 'number-to-words';
import _ from 'lodash';
import './style.css';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: null
    };
    this.handleStrikeout = this.handleStrikeout.bind(this);
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  fetchRecipe() {
    const { id } = this.props.match.params
    axios.get(`/api/recipes/${id}`)
    .then(response => response.data)
    .then(recipe => {
      this.setState({ recipe })
    })
    .catch(error => console.log(error));
  }

  handleStrikeout(e) {
    e.target.className === 'strike'
      ? e.target.className = ''
      : e.target.className = 'strike'
  }

  renderIngredient(ingredient) {
    return (
      <p key={_.uniqueId()}>
        <span onClick={ this.handleStrikeout }>{ ingredient }</span>
      </p>
    );
  }

  renderInstruction(instruction, i) {
    return (
      <p key={ i }>
        <span className='lighter-label'>step { converter.toWords(i + 1) }</span>
        <span onClick={ this.handleStrikeout }>{ instruction }</span>
      </p>
    );
  }

  renderRecipe(recipe) {
    return (
      <div key={_.uniqueId()}>
        <h1>{ recipe.name }</h1>
        <i className='lighter-label'>{ recipe.prep + recipe.cook } mins</i>
        <div>
          <h2>Ingredients</h2>
          <i className='lighter-label'>prep: { recipe.prep } mins</i>
          { recipe.ingredients.map(ingredient => this.renderIngredient(ingredient)) }
        </div>
        <div>
          <h2>Instructions</h2>
          <i className='lighter-label'>cook: { recipe.cook } mins</i>
          { recipe.instructions.map((instruction, i) => this.renderInstruction(instruction, i)) }
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