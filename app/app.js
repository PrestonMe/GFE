import React, { Component } from 'react';
import axios from 'axios';
import RepList from './components/RepList';
import RepDetails from './components/RepDetails';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: '',
      representative: '',
      reps: []
    }
    this.updateInput = this.updateInput.bind(this);
    this.getReps = this.getReps.bind(this);
    this.showRepDetails = this.showRepDetails.bind(this);
  }

  updateInput(e) {
    let obj = this.state;
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  getReps(e) {
    let obj = this.state;
    if(obj.state && obj.representative) {
      if(obj.representative === 'rep') {
        axios.get(`/representatives/${obj.state}`).then(res => {
          this.setState({reps: res.data.results})
        })
      } else {
        axios.get(`/senators/${obj.state}`).then(res => {
          this.setState({reps: res.data.results})
        })
      }
    }
  }

  showRepDetails(rep) {
    console.log('rep', rep);
  }

    render() {
      return (
        <div>
          <h1>Who's My Representative?</h1>
          <div>

            <select onChange={this.updateInput} name='representative' value={this.state.representative}>
              <option defaultValue value=''>[rep/sen]</option>
              <option value='rep'>Representative</option>
              <option value='sen'>Senators</option>
            </select>

            <select onChange={this.updateInput} name='state' value={this.state.state}>
              <option defaultValue value=''>[Select a State]</option>
              <option value='AL'>Alabama</option>
              <option value='AK'>Alaska</option>
              <option value='AZ'>Arizona</option>
              <option value='AR'>Arkansas</option>
              <option value='CA'>California</option>
              <option value='CO'>Colorado</option>
              <option value='CT'>Connecticut</option>
              <option value='DE'>Delaware</option>
              <option value='FL'>Florida</option>
              <option value='GA'>Georgia</option>
              <option value='HI'>Hawaii</option>
              <option value='ID'>Idaho</option>
              <option value='IL'>Illinois</option>
              <option value='IN'>Indiana</option>
              <option value='IA'>Iowa</option>
              <option value='KS'>Kansas</option>
              <option value='KY'>Kentucky</option>
              <option value='LA'>Louisiana</option>
              <option value='ME'>Maine</option>
              <option value='MD'>Maryland</option>
              <option value='MA'>Massachusetts</option>
              <option value='MI'>Michigan</option>
              <option value='MN'>Minnesota</option>
              <option value='MS'>Mississippi</option>
              <option value='MO'>Missouri</option>
              <option value='MT'>Montana</option>
              <option value='NE'>Nebraska</option>
              <option value='NV'>Nevada</option>
              <option value='NH'>New Hampshire</option>
              <option value='NJ'>New Jersey</option>
              <option value='NM'>New Mexico</option>
              <option value='NY'>New York</option>
              <option value='NC'>North Carolina</option>
              <option value='ND'>North Dakota</option>
              <option value='OH'>Ohio</option>
              <option value='OK'>Oklahoma</option>
              <option value='OR'>Oregon</option>
              <option value='PA'>Pennsylvania</option>
              <option value='RI'>Rhode Island</option>
              <option value='SC'>South Carolina</option>
              <option value='SD'>South Dakota</option>
              <option value='TN'>Tennessee</option>
              <option value='TX'>Texas</option>
              <option value='UT'>Utah</option>
              <option value='VT'>Vermont</option>
              <option value='VA'>Virginia</option>
              <option value='WA'>Washington</option>
              <option value='WV'>West Virginia</option>
              <option value='WI'>Wisconsin</option>
              <option value='WY'>Wyoming</option>
            </select>

            <button onClick={this.getReps}>Submit</button>
          </div>

            <RepList people={this.state.reps} selectedRep={this.showRepDetails} />

            <RepDetails />
        </div>
      )
    }
}

export default App;
