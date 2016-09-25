import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button, InputGroup,FormGroup, FormControl,
  Row, Col
} from 'react-bootstrap';
//-------------------------------------------------------------------//

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
  }

  render() {
    return (
      <Row className="search-bar">
        <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
          <form id="search">
            <FormGroup>
              <InputGroup bsSize='large'>
                <FormControl
                  type='text'
                  placeholder='Search For Recipes'
                  id='searchbar'
                  onChange={this.props.filterRecipes}
                  onKeyPress={this.onEnter}
                />
                <InputGroup.Button>
                  <Button onClick={this.props.toggleModal} >Add New Recipe</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        </Col>
      </Row>
    )
  }

  onEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.props.toggleModal();
    }
  }

};

SearchBar.propTypes = {
  filterRecipes: React.PropTypes.func,
  toggleModal: React.PropTypes.func,
}
