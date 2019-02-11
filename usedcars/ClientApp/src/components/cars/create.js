import React, {Component} from 'react';
import {Route, Redirect} from 'react-router'
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from 'reactstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class CarCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brand: null,
      model: null,
      year: 2019,
      kilometers: null,
      price: null,
      errors: {
        brand: false,
        model: false,
        year: false,
        kilometers: false,
        price: false
      },
      created: false
    };

    this.optionsYear = new Array();
    var year = (new Date()).getYear() + 1900;
    for (var i = year; i > 1900; i--) {
      this.optionsYear.push(<option key={i}>{i}</option>)
    }
  }

  checkValidInput(value, campo) {
    var errors = this.state.errors;
    errors[campo] = false;
    switch (campo.toLowerCase()) {
      case 'kilometers':
        if (value < 0 || value > 1000000) {
          errors[campo] = true;
        }
        break;
      case 'price':
        if (value < 1 || value > 10000000) {
          errors[campo] = true;
        }
        break;
      case 'year':
        if (value < 0 || value > 9000) {
          errors[campo] = true;
        }
        break;
      case 'description':
        if (value.length > 100) {
          errors[campo] = true;
        }
        break;
      case 'model':
      case 'brand':
        if (value.length > 50) {
          errors[campo] = true;
        }
        break;
      default:
    }
    var newState = {
      errors: errors
    };
    newState[campo] = value;
    this.setState(newState)
  }

  isValid() {
    for (var i in this.state.errors) {
      if (this.state.errors[i] === true) {
        return false;
      }
    }
    return true;
  }

  saveCard() {
    var self = this;
    if (this.isValid()) {
      fetch('api/cars/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Brand: this.state.brand, model: this.state.model, year: this.state.year, kilometers: this.state.kilometers, price: this.state.price})
      }).then(response => response.json()).then((response) => {
        console.log(response);
        if (response.success) {
          self.setState({created: true});
        }
      })
    }
  }

  render() {
    if (this.state.created === true) {
      return <Redirect to='/?success=true'/>
    }
    return (<div className="row">
      <div className="col-md-12">
        <h1>Register new Car</h1>
      </div>
      <div className="col-md-12">
        <div>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Brand</Label>
            <Col sm={10}>
              <Input placeholder="Brand" invalid={this.state.errors.brand} onChange={(evt) => this.checkValidInput(evt.target.value, 'brand')}/>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Model</Label>
            <Col sm={10}>
              <Input placeholder="Model" invalid={this.state.errors.model} onChange={(evt) => this.checkValidInput(evt.target.value, 'model')}/>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleSelect" sm={2}>Year</Label>
            <Col sm={10}>
              <Input type="select" invalid={this.state.errors.year} onChange={(evt) => this.checkValidInput(evt.target.value, 'year')}>
                {this.optionsYear}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Kilometers</Label>
            <Col sm={10}>
              <Input type="number" placeholder="0" invalid={this.state.errors.kilometers} onChange={(evt) => this.checkValidInput(evt.target.value, 'kilometers')}/>
              <FormFeedback>Invalid value for Kilometers</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Price ($)</Label>
            <Col sm={10}>
              <Input type="number" placeholder="0" invalid={this.state.errors.price} onChange={(evt) => this.checkValidInput(evt.target.value, 'price')}/>
              <FormFeedback>Invalid value for Price</FormFeedback>
            </Col>
          </FormGroup>
          <div className="row">
            <div className="col-md-12">
              <button className="float-right btn btn-success" onClick={() => this.saveCard()}>
                SAVE
              </button>
              <a className="float-right btn btn-default" href="/" role="button">
                CANCEL
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
};

export default CarCreate;
