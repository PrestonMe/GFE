import React, { Component } from 'react';
import axios from 'axios';
import RepList from './RepList';
import RepDetails from './RepDetails';
import RepSelect from './RepSelect';
import StateSelect from './StateSelect';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: '',
      rep: '',
      repList: [],
      selectedRep: null,
      submitReady: false
    }
    this.updateInput = this.updateInput.bind(this);
    this.getReps = this.getReps.bind(this);
    this.showRepDetails = this.showRepDetails.bind(this);
  }

  updateInput(e) {
    let obj = this.state;
    obj[e.target.name] = e.target.value;

    this.setState(obj, function() {
      if(obj.submitReady === false) {
        if(this.state.state && this.state.rep) {
          this.setState({submitReady: true});
        }
      }
    });

  }

  getReps(e) {
    let obj = this.state;

    if(obj.state && obj.rep) {
      axios.get(`/${obj.rep === 'rep' ? 'representatives' : 'senators'}/${obj.state}`).then(res => {
        this.setState({repList: res.data.results, selectedRep: null})
      })
    }

  }

  showRepDetails(rep) {
    this.setState({selectedRep: rep})
  }

  render() {
    return (
      <div className='main'>
        <p className='header'>Who's My Representative?</p>

        <div className='options-bar'>
          <RepSelect update={this.updateInput} />
          <StateSelect update={this.updateInput} />
          <button disabled={!this.state.submitReady} onClick={this.getReps}>Submit</button>
        </div>

        <div className='reps'>
          <RepList people={this.state.repList} selectedRep={this.showRepDetails} />
          <RepDetails rep={this.state.selectedRep} />
        </div>
      </div>
    )
  }
}

export default App;
