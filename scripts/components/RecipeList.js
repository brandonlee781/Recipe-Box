import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button, ButtonGroup, InputGroup,
  FormGroup, FormControl, Panel,
  Accordion, Grid, Row,
  Col, Modal
} from 'react-bootstrap';
//-------------------------------------------------------------------//

import Recipe from './Recipe';

//-------------------------------------------------------------------//

export default class RecipeList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className="recipe-list">
        <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
          {this.recipeList()}
        </Col>
      </Row>
    )
  }

  recipeList() {
    if(this.props.data < 1) {
      return (
        <div className="center">
          <h3>There doesn't seem to be anything here.</h3>
          <p>You should either narrow your search or create a new recipe.</p>
        </div>
      )
    }
    var list = this.props.data.map(function(data) {
      return (
        <Recipe
          key={data.id}
          data={data}
          deleteRecipe={this.props.deleteRecipe}
          editRecipe={this.props.editRecipe}
          toggleModal={this.props.toggleModal}
        />
      )
    },this);
    return list;
  }
}

RecipeList.propTypes = {
  data: React.PropTypes.array,
  deleteRecipe: React.PropTypes.func,
  toggleModal: React.PropTypes.func,
  getDataForModal: React.PropTypes.func
}
