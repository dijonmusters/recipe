import React from 'react';
import _ from 'lodash';
import './style.css';

const RecipeGrid = (props) => {
  const { recipes } = props;

  const renderRecipe = (recipe) => {
    return (
      <div key={ _.uniqueId() }>
        <img src={ recipe.imgUrl } className='recipe-img' />
      </div>
    );
  }

  return (
    <div className='recipe-grid'>
      { recipes.map(renderRecipe) }
    </div>
  )
}

export default RecipeGrid;