import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button, InputGroup,FormGroup, FormControl,
  Row, Col
} from 'react-bootstrap';
//-------------------------------------------------------------------//

export default class SearchBar extends React.Component {
  render() {
    return (
      <Row className="search-bar">
        <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
          <form id="search">
            <FormGroup>
              <InputGroup bsSize='large'>
                <FormControl
                  type='text'
                  placeholder='Search For Recipes'
                  id='searchbar'
                  onChange={this.props.filterRecipes}
                />
                <InputGroup.Button>
                  <Button onClick={this.props.openModal} >Add New Recipe</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        </Col>
      </Row>
    )
  }
}
