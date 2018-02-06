import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import RecipeGrid from './RecipeGrid';
import _ from 'lodash';
import './style.css';

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      filteredRecipes: null
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  fetchRecipe() {
    axios.get('/api/recipes')
    .then(response => response.data)
    .then(recipes => {
      this.setState({ recipes, filteredRecipes: recipes })
    })
    .catch(error => console.log(error));
  }

  handleFilter(e) {
    const { recipes } = this.state;
    const filteredRecipes = recipes.filter(recipe => recipe.name.includes(e.target.value));
    this.setState({ filteredRecipes });
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
    const { recipes, filteredRecipes } = this.state;
    return recipes ? (
      <div>
        <Link to='/recipes/add'><RaisedButton>add recipe</RaisedButton></Link>
        <br />
        <input type='text' className='search-box' placeholder='search for recipe, ingredient or tag' onChange={ this.handleFilter } />
        <RecipeGrid recipes={ filteredRecipes } />
        {/* { filteredRecipes.map(recipe => this.renderRecipe(recipe)) } */}
      </div>
    ) : <div>loading...</div>;
  }
}

export default RecipeList;