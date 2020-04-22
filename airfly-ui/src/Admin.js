import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

class Admin extends Component{
    render(){
        return(
            <div>
            <button type="button" class="btn btn-primary">Dodaj Let</button>
            <button type="button" class="btn btn-primary">Dodaj Kartu</button>
            </div>
        )
    }
    
}
export default Admin