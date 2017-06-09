import React, { Component } from 'react';

class RepSelect extends Component {
    constructor(props){
      super(props)
      this.state = {
        rep: '1'
      }
      this.updateRep = this.updateRep.bind(this);
    }

    updateRep(e) {
      this.setState({rep: e.target.value}, function() {
        this.props.update(e);
      })
    }

    render() {
      return(
        <select onChange={this.updateRep} name='rep' value={this.state.rep}>
          <option value='1' disabled>[Rep/Sen]</option>
          <option value='rep'>Representative</option>
          <option value='sen'>Senators</option>
        </select>
      )
    }
}

export default RepSelect;
