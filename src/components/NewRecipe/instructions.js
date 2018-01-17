import React from 'react';
import { TextField } from 'material-ui';
import './style.css';

const Instructions = (props) => {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.handleNewInstruction();
    }
  }

  const renderInstruction = (instruction, i) => {
    return (
      <div key={ i } className='full-width'>
        <TextField
          hintText="instruction"
          floatingLabelText="instruction"
          onChange={ props.handleInstructionChange(i) }
          onKeyPress={handleKeyPress}
          value={ instruction }
          autoFocus
        />
      </div>
    );
  }

  const { instructions } = props;
  return (
    <div>
      <h2>my instructions</h2>
      { instructions.map((instruction, i) => renderInstruction(instruction, i)) }
    </div>
  )
}

export default Instructions;