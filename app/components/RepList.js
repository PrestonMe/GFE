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
      <div className='reps-list'>
        <p className='list-title'>List / <span>Representatives</span></p>
        <div className='name-party'>
          <p>Name</p>
          <p>Party</p>
        </div>
        <ul>
          {this.state.representatives[0] && this.state.representatives.map(politician =>
             <li className='name-party list-names' onClick={() => this.selectRep(politician)}>
               <p>{politician.name}</p>
               <p>{politician.party[0]}</p>
             </li>
          )}
        </ul>
      </div>
    )
  }
}

export default RepList;
