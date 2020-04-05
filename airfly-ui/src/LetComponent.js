import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import $ from 'jquery';

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
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Datum</th>
            <th>Broj mesta</th>
            <th>Vrsta</th>
            <th>Naziv Polaznog Aerodroma</th>
            <th>Naziv Dolaznog Aerodroma</th>
            <th>Kompanija</th>
          </tr>
        </thead>
        <tbody>

            <tr>
        { this.state.letovi.map(flight => <td>{flight.datum}</td>)}
          
          </tr>
          
        </tbody>
      </Table>
    )
  }
}
