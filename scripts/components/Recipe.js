import React from 'react';
import ReactDOM from 'react-dom';

import { Button, ButtonGroup, Panel } from 'react-bootstrap';

//-------------------------------------------------------------------//

export default class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({open: false});
    this.togglePanel = this.togglePanel.bind(this);
  }

  render() {
    return (
      <Panel onClick={this.togglePanel}>
        {this.panelOption()}
      </Panel>
    )
  }

  togglePanel() {
    this.setState({open: !this.state.open});
  }

  panelOption() {
    let ingList = this.props.data.ingredients.map(function(data){
      const ingKey = this.props.data.id + '-' + this.props.data.ingredients.indexOf(data);
      return <li key={ingKey}>{data}</li>
    },this)
    if(this.state.open) {
      return (
        <div key={this.props.data.id}>
          <h4>{this.props.data.name}</h4>
          <ul>
            {ingList}
          </ul>
          <ButtonGroup>
            <Button onClick={this.props.openModal.bind(this,this.props.data)}>Edit</Button>
            <Button bsStyle="danger" onClick={this.props.deleteRecipe.bind(this,this.props.data.id)}>Delete</Button>
          </ButtonGroup>
          </div>
      )
    } else {
      return (
        <h4 key={this.props.data.id}>
          {this.props.data.name}
          <small className="pull-right vcenter"> {this.props.data.ingredients.length} Ingredients</small>
        </h4>
      )
    }
  }

}
