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
    let politician = this.state.politician;

    return (
      <div className='rep-details'>
        <p className='details-title'>Info</p>
        {this.state.politician
        && <ul>
          <li>First Name: {politician.name.split(' ')[0]}</li>
          <li>Last Name: {politician.name.split(' ')[1]}</li>
          <li>District: {politician.district ? politician.district : 'N/A'}</li>
          <li>Phone: {politician.phone}</li>
          <li>Address: {politician.office}</li>
          <li><a href={politician.link}>Website</a></li>
        </ul>
        }
      </div>
    )
  }
}

export default RepDetails;
