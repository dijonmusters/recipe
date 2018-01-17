import React from 'react';
import { TextField } from 'material-ui';
import './style.css';

const Ingredients = (props) => {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.handleNewIngredient();
    }
  }

  const renderIngredient = (ingredient, i) => {
    return (
      <div key={ i } className='full-width'>
        <TextField
          hintText="ingredient"
          floatingLabelText="ingredient"
          onChange={ props.handleIngredientChange(i) }
          onKeyPress={ handleKeyPress }
          value={ ingredient }
          autoFocus
        />
      </div>
    );
  }

  const { ingredients } = props;
  return (
    <div>
      <h2>my ingredients</h2>
      { ingredients.map((ingredient, i) => renderIngredient(ingredient, i)) }
    </div>
  )
}

export default Ingredients;