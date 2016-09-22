import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button, ButtonGroup, InputGroup,
  Form, FormGroup, FormControl, ControlLabel,
  Grid, Row, Col
} from 'react-bootstrap';
//-------------------------------------------------------------------//

export default class EditRecipeModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: []
    }
    this.addIngredientInput = this.addIngredientInput.bind(this);
    this.pressEnterAdd = this.pressEnterAdd.bind(this);
    this.removeIngredientInput = this.removeIngredientInput.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.newNameToInput = this.newNameToInput.bind(this);
  }

  componentWillReceiveProps() {
    if(this.props.newName !== '') {
      this.setState({name: this.props.newName},function() { this.newNameToInput() });
    }
  }

  render() {
    return (
      <Form horizontal id="edit-recipe-form">
        <h2>Enter recipe information</h2>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder={this.state.name || 'Recipe Name'}
              id="edit-name-input"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Ingredients
          </Col>
          <Col sm={10}>
            {this.ingredientInputList()}
            <Row>
              <Col sm={11}>
                <FormControl type="text" placeholder="Enter Ingredient Name" id="blank-ingredient-input"  onKeyPress={this.pressEnterAdd} />
              </Col>
              <Col sm={1}>
                <Button onClick={this.addIngredientInput}>+</Button>
              </Col>
            </Row>
          </Col>
          <Col sm={12}>
            <ButtonGroup>
              <Button bsStyle='success' onClick={this.saveRecipe}>Save</Button>
            </ButtonGroup>
          </Col>
          </FormGroup>
      </Form>
    )
  }

  ingredientInputList() {
    let inputList = this.state.ingredients.map(function(data){
      const index = this.state.ingredients.indexOf(data);
      return (
        <Row key={data}>
          <Col sm={11}>
            <FormControl type="text" defaultValue={data} />
          </Col>
          <Col sm={1}>
            <Button onClick={this.removeIngredientInput.bind(this,index)}>-</Button>
          </Col>
        </Row>
      )
    },this);
    return inputList;
  }

  addIngredientInput() {
    let inputValue = document.getElementById('blank-ingredient-input').value;
    this.state.ingredients.push(inputValue);
    this.setState({ingredients: this.state.ingredients});
    document.getElementById('blank-ingredient-input').value = '';
  }

  pressEnterAdd(event) {
    if(event.key === 'Enter') {
      this.addIngredientInput();
    }
  }

  removeIngredientInput(index) {
    console.log(index,this.state.ingredients[index]);
    this.state.ingredients.splice(index,1);
    this.setState({ingredients:this.state.ingredients});
  }

  saveRecipe() {
    console.log(this.props.newName);
  }

  newNameToInput() {
    document.getElementById('edit-name-input').value = this.state.name;
  }
}
