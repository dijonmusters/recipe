import React from 'react';
import { TextField, RaisedButton, Snackbar } from 'material-ui';
import axios from 'axios';
import './style.css';
import Ingredients from './ingredients';
import Instructions from './instructions';

class NewRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      recipe: {
        name: '',
        prep: '',
        cook: '',
        ingredients: [ '' ],
        instructions: [ '' ],
      },
      userMessage: '',
      userMessageShow: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleNewInstruction = this.handleNewInstruction.bind(this);
    this.handleUserMessageClose = this.handleUserMessageClose.bind(this);
  }

  handleChange(field, e) {
    const { recipe } = this.state;
    recipe[field] = e.target.value.toLowerCase();
    this.setState({ recipe });
  }

  handleIngredientChange = (i) => (e) => {
    const { ingredients } = this.state.recipe;
    ingredients[i] = e.target.value.toLowerCase();
    this.setState({ ingredients });
  }

  handleInstructionChange = (i) => (e) => {
    const { instructions } = this.state.recipe;
    instructions[i] = e.target.value.toLowerCase();
    this.setState({ instructions });
  }

  handleNewIngredient() {
    const { recipe } = this.state;
    recipe.ingredients.push('');
    this.setState({ recipe });
  }

  handleNewInstruction() {
    const { recipe } = this.state;
    recipe.instructions.push('');
    this.setState({ recipe });
  }

  handleSubmit() {
    const { recipe } = this.state;
    axios.post('/api/addrecipe', recipe)
    .then(response => response.data)
    .then(response => {
      this.setState({
        userMessage: `${recipe.name} saved`,
        userMessageShow: true
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleUserMessageClose() {
    this.setState({ userMessageShow: false });
  }

  render() {
    const { recipe, userMessage, userMessageShow } = this.state;
    return (
      <div>
        <h1>add recipe</h1>
        <div className='full-width'>
          <TextField
            hintText="name"
            floatingLabelText="name"
            onChange={ this.handleChange.bind(this, 'name') }
            value={ recipe.name }
            autoFocus
          />
        </div>
        <div className='full-width'>
          <TextField
            hintText="prep time"
            floatingLabelText="prep time"
            onChange={ this.handleChange.bind(this, 'prep') }
            value={ recipe.prep }
          />
        </div>
        <div className='full-width'>
          <TextField
            hintText="cook time"
            floatingLabelText="cook time"
            onChange={ this.handleChange.bind(this, 'cook') }
            value={ recipe.cook }
          />
        </div>
        <Ingredients
          ingredients={ recipe.ingredients }
          handleNewIngredient={ this.handleNewIngredient }
          handleIngredientChange={ this.handleIngredientChange }
        />
        <Instructions
          instructions={ recipe.instructions }
          handleNewInstruction={ this.handleNewInstruction }
          handleInstructionChange={ this.handleInstructionChange }
        />
        <div className='full-width'>
          <RaisedButton onClick={ this.handleSubmit }>Save</RaisedButton>
        </div>
        <Snackbar
          open={ userMessageShow }
          message={ userMessage }
          autoHideDuration={ 4000 }
          onRequestClose={ this.handleRequestClose }
        />
      </div>
    )
  }
}

export default NewRecipe;