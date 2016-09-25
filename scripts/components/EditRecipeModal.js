import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button, ButtonGroup, InputGroup,
  Form, FormGroup, FormControl, ControlLabel,
  Grid, Row, Col, Glyphicon
} from 'react-bootstrap';
//-------------------------------------------------------------------//

export default class EditRecipeModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: 'New Recipe Name',
      ingredients: [],
      index: ''
    }
    this.addIngredientInput = this.addIngredientInput.bind(this);
    this.pressEnterAddIngredientInput = this.pressEnterAddIngredientInput.bind(this);
    this.removeIngredientInput = this.removeIngredientInput.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.newNameToInput = this.newNameToInput.bind(this);
  }

  componentDidMount() {
    if (this.props.searchQueryToModal !== '' && this.props.searchQueryToModal !== undefined) {
      let searchData = this.props.searchQueryToModal;
      this.setState({name: searchData },function() { this.newNameToInput() });
    }
    if(Object.keys(this.props.editRecipe).length !== 0) {
      let editData = this.props.editRecipe;
      this.setState({
        id: editData.id,
        name: editData.name,
        ingredients: editData.ingredients,
        index: editData.index
      },function() { this.newNameToInput() })
    }
  }

  render() {
    return (
      <Form horizontal id="edit-recipe-form">
        <h2>Enter recipe information</h2>
        <Button className="modal-close-button" bsStyle="link" onClick={this.props.toggleModal}><Glyphicon glyph="remove" /></Button>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder={this.state.name }
              id="edit-name-input"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} xs={2}>
            Ingredients
          </Col>
          <Col xs={10}>
            {this.ingredientInputList()}
            <Row>
              <Col xs={11}>
                <FormControl type="text" placeholder="Enter Ingredient Name" id="blank-ingredient-input"  onKeyPress={this.pressEnterAddIngredientInput} />
              </Col>
              <Col xs={1}>
                <Button onClick={this.addIngredientInput}>+</Button>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="save-button-group">
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
          <Col xs={11}>
            <FormControl type="text" defaultValue={data} className="ingredient-input"/>
          </Col>
          <Col xs={1}>
            <Button onClick={this.removeIngredientInput.bind(this,index)}>-</Button>
          </Col>
        </Row>
      )
    },this);
    return inputList;
  }

  addIngredientInput() {
    let inputValue = document.getElementById('blank-ingredient-input').value;
    if (inputValue !== '') {
      this.state.ingredients.push(inputValue);
      this.setState({ingredients: this.state.ingredients});
      document.getElementById('blank-ingredient-input').value = '';
    }
  }

  pressEnterAddIngredientInput(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.addIngredientInput();
    }
  }

  removeIngredientInput(index) {
    this.state.ingredients.splice(index,1);
    this.setState({ingredients:this.state.ingredients});
  }

  saveRecipe() {
    const recipeName = document.getElementById('edit-name-input').value;
    const inputs = document.getElementsByClassName('ingredient-input');
    let ingredientArr = [];
    for (let i = 0; i < inputs.length;i++) {
      ingredientArr.push(inputs[i].value);
    }
    const lastIngredient = document.getElementById('blank-ingredient-input');
    // If the user added a final ingredient but didn't hit the + button.
    if (lastIngredient.value !== '') {
      ingredientArr.push(lastIngredient.value);
    }
    this.props.addRecipe(recipeName,ingredientArr,this.state.index);
    this.setState({
      id: '',
      name: 'New Recipe Name',
      ingredients: [],
      index: ''
    });
  }

  newNameToInput() {
    document.getElementById('edit-name-input').value = this.state.name;
  }
}

EditRecipeModal.propTypes = {
  searchQueryToModal: React.PropTypes.string,
  editRecipe: React.PropTypes.object,
  toggleModal: React.PropTypes.func,
  addRecipe: React.PropTypes.func
}
