import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button, ButtonGroup, InputGroup,
  FormGroup, FormControl, Grid, Row,
  Col, Modal
} from 'react-bootstrap';

//---------------------------------------------------------------------------\\

import recipes from '../sample-recipes.js';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import EditRecipeModal from './EditRecipeModal';

//---------------------------------------------------------------------------\\

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: '',
      filteredRecipes: '',
      showModal: false
    };
    this.filterRecipes = this.filterRecipes.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentWillMount() {
    this.setState({recipes: recipes,filteredRecipes: recipes});
  }

  render() {
    return (
      <Grid>
        <SearchBar filterRecipes={this.filterRecipes} openModal={this.openModal} />
        <RecipeList data={this.state.filteredRecipes} deleteRecipe={this.deleteRecipe} openModal={this.openModal}/>
        <Modal show={this.state.showModal} onHide={this.openModal}>
          <EditRecipeModal newName={this.newName()}/>
        </Modal>
      </Grid>
    )
  }

  filterRecipes(event) {
    event.preventDefault();
    const regex = new RegExp(event.target.value,'i');
    const filtered = this.state.recipes.filter(function(datum) {
      return (datum.name.search(regex) > -1);
    });

    this.setState({
      'filteredRecipes': filtered,
    });
  }

  openModal() {
    this.setState({showModal: !this.state.showModal});
  }

  deleteRecipe(id) {
    if(confirm('Are you sure you want to delete this recipe?')) {
      var index = this.state.recipes.findIndex(function(recipe) {
        return recipe.id === id;
      })
      this.state.recipes.splice(index,1);
      this.setState({recipes: this.state.recipes});
    }
  }

  newName() {
    if(document.getElementById('searchbar') !== null && document.getElementById('searchbar') !== undefined) {
      return document.getElementById('searchbar').value;
    }
  }

}
