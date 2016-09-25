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
      recipes: [],
      filteredRecipes: [],
      editRecipe: {},
      showModal: false
    };
    this.filterRecipes = this.filterRecipes.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.searchQueryToModal = this.searchQueryToModal.bind(this);
  }

  componentWillMount() {
    const local = JSON.parse(localStorage.getItem('recipes')) || [];
    this.setState({recipes: local, filteredRecipes: local});
  }

  componentDidUpdate() {
    let dataToStore = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes',dataToStore);
  }

  render() {
    return (
      <Grid>
        <SearchBar filterRecipes={this.filterRecipes} toggleModal={this.toggleModal} />
        <RecipeList data={this.state.filteredRecipes} deleteRecipe={this.deleteRecipe} toggleModal={this.toggleModal} editRecipe={this.editRecipe}/>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <EditRecipeModal searchQueryToModal={this.searchQueryToModal()} toggleModal={this.toggleModal} addRecipe={this.addRecipe} editRecipe={this.state.editRecipe}/>
        </Modal>
      </Grid>
    )
  }

  filterRecipes(event) {
    event.preventDefault();
    const regex = new RegExp(event.target.value,'i');
    // Only return recipes that match currently entered text
    // This function is fired on each keypress so it's
    // constantly updating
    if (this.state.recipes !== null) {
      const filtered = this.state.recipes.filter(function(datum) {
        return (datum.name.search(regex) > -1);
      });

      // set filteredRecipes to list of filtered recipes
      // RecipeList is rendered based off this state
      // Recipes state is doesn't change and is used as a reference
      this.setState({
        'filteredRecipes': filtered,
      });
    }
  }

  toggleModal() {
    if (this.state.showModal === true) {
      // Reset Searchbar
      document.getElementById('searchbar').value = '';
      // Reset Search Filter
      this.setState({
        filteredRecipes: this.state.recipes,
        editRecipe: {}
      });
    }
    this.setState({showModal: !this.state.showModal});
  }

  addRecipe(name,ingredients,index) {
    function randNum() {
      let str = '';
      for (var i = 0;i < 7;i++) {
        str += Math.floor(Math.random() * 9);
      }
      return str.toString();
    }

    if (index !== '') {
      this.state.recipes[index].name = name;
      this.state.recipes[index].ingredients = ingredients;
      this.setState({
        recipes:this.state.recipes,
        filteredRecipes: this.state.recipes
      },function() { this.toggleModal() });
    } else {
      let obj = {
        id: randNum(),
        name: name,
        ingredients: ingredients
      };

      this.state.recipes.push(obj);
      this.setState({
        recipes: this.state.recipes,
        filteredRecipes: this.state.recipes
      },function() { this.toggleModal() });
    }
  }

  deleteRecipe(id) {
    if(confirm('Are you sure you want to delete this recipe?')) {
      let index = this.state.recipes.findIndex(function(recipe) {
        return recipe.id === id;
      })
      this.state.recipes.splice(index,1);
      this.setState({recipes: this.state.recipes});
    }
  }

  editRecipe(id) {
    let index = this.state.recipes.findIndex(function(recipe) {
      return recipe.id === id;
    })
    let obj = this.state.recipes[index];
    obj.index = index;
    this.setState({editRecipe: obj,});
    this.toggleModal();
  }

  searchQueryToModal() {
    if(document.getElementById('searchbar') !== null && document.getElementById('searchbar').value !== '') {
      return document.getElementById('searchbar').value;
    }
  }

  randNum() {
  let str = '';
  for (var i = 0;i < 7;i++) {
    str += Math.floor(Math.random() * 9);
  }
  return str.toString();
}

}
