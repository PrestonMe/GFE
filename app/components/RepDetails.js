import React, { Component } from 'react';

class RepDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      politician: null
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({politician: nextProps.rep})
  }

  render() {
    return (
      <div>
        {this.state.politician
        ? <ul>
          <li>{this.state.politician.name.split(' ')[0]}</li>
          <li>{this.state.politician.name.split(' ')[1]}</li>
          <li>{this.state.politician.district}</li>
          <li>{this.state.politician.phone}</li>
          <li>{this.state.politician.office}</li>
          <li>{this.state.politician.link}</li>
        </ul>
        : ''
        }
      </div>
    )
  }
}

export default RepDetails;
