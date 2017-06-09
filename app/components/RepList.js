import React, { Component } from 'react';

class RepList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      representatives: []
    }
    this.selectRep = this.selectRep.bind(this);
  }

  selectRep(rep) {
    this.props.selectedRep(rep);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({representatives: nextProps.people});
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.representatives[0] && this.state.representatives.map(politician =>
             <li onClick={() => this.selectRep(politician)}>{politician.name} {politician.party[0]}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default RepList;
