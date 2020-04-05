import React from 'react';

import axios from 'axios';

export default class LetComponent extends React.Component {
  state = {
    letovi: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/AirFly/let/getAllFlights`)
      .then(res => {
        const letovi = res.data;
        this.setState({ letovi });
      })
  }

  render() {
    return (
      <ul>
        { this.state.letovi.map(letimir => <li>{letimir.datum}</li>)}
      </ul>
    )
  }
}
