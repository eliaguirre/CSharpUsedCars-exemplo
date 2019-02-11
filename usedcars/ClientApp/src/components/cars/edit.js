import React, {Component} from 'react';
import {Route, Redirect} from 'react-router'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Card,
  CardBody,
  CardText
} from 'reactstrap';

class CarEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.carID,
      brand: '',
      model: '',
      year: 0,
      kilometers: 0,
      price: 0,
      loading: true,
      created: false,
      errors: {
        brand: false,
        model: false,
        year: false,
        kilometers: false,
        price: false
      }
    };
    this.optionsYear = new Array();
    var year = (new Date()).getYear() + 1900;
    for (var i = year; i > 1900; i--) {
      this.optionsYear.push(<option key={i}>{i}</option>)
    }
    this.getCar(this.state.id);
  }

  getCar(id) {
    var self = this;
    fetch('api/cars/' + id).then(response => response.json()).then(data => {
      if (data.success) {
        self.setState({
          loading: false,
          brand: data.data.brand,
          model: data.data.model,
          year: data.data.year,
          kilometers: data.data.kilometers,
          price: data.data.price
        });
      } else {
        this.setState({loading: false});
      }
    });
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
    if (this.isValid()) {
      fetch('api/cars/' + this.state.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({Brand: this.state.brand, model: this.state.model, year: this.state.year, kilometers: this.state.kilometers, price: this.state.price})
      }).then(response => response.json()).then((response) => {
        console.log(response);
        if (response.success) {
          this.setState({created: true});
        }
      });
    }
  }

  render() {
    if (this.state.created === true) {
      return <Redirect to='/?success=true'/>
    }
    if (this.state.loading) {
      return (<div>
        <Card>
          <CardBody className="text-center">
            <CardText className="text-center">
              Loading
            </CardText>
          </CardBody>
        </Card>
      </div>);
    }
    if (!this.state.loading && this.state.year == 0) {
      return (<div>
        <Card>
          <CardBody className="text-center">
            <MaterialIcon icon="info_outline" size='large'/>
            <CardText className="text-center">
              Used car Not Found
            </CardText>
          </CardBody>
        </Card>
      </div>);
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
              <Input defaultValue={this.state.brand} placeholder="Brand" invalid={this.state.errors.brand} onChange={(evt) => this.checkValidInput(evt.target.value, 'brand')}/>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Model</Label>
            <Col sm={10}>
              <Input defaultValue={this.state.model} placeholder="Model" invalid={this.state.errors.model} onChange={(evt) => this.checkValidInput(evt.target.value, 'model')}/>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleSelect" sm={2}>Year</Label>
            <Col sm={10}>
              <Input defaultValue={this.state.year} type="select" invalid={this.state.errors.year}>
                {this.optionsYear}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Kilometers</Label>
            <Col sm={10}>
              <Input defaultValue={this.state.kilometers} type="number" placeholder="0" invalid={this.state.errors.kilometers} onChange={(evt) => this.checkValidInput(evt.target.value, 'kilometers')}/>
              <FormFeedback>Invalid value for Kilometers</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Label for="exampleEmail" sm={2}>Price ($)</Label>
            <Col sm={10}>
              <Input defaultValue={this.state.price} type="number" placeholder="0" invalid={this.state.errors.price} onChange={(evt) => this.checkValidInput(evt.target.value, 'price')}/>
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

export default CarEdit;
