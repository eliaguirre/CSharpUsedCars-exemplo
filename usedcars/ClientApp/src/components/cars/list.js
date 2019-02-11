import React, {Component} from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import SweetAlert from 'sweetalert2-react';
import {Card, CardBody, CardText} from 'reactstrap';

class CarList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      loading: true
    };
    fetch('api/cars/index').then(response => response.json()).then(data => {
      if (data.success && data.data.length > 0) {
        this.setState({cars: data.data, loading: false, showDialogDelete: false, current_car: null});
      } else {
        this.setState({loading: false, showDialogDelete: false, current_car: null});
      }
    });
  }

  deleteCar() {
    var self=this;
    this.setState({showDialogDelete: false});
    fetch('api/cars/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.state.current_car.id})
    }).then(response => response.json()).then((response) => {
      if (response.success) {
        var cars = self.state.cars;
        var key = -1;
        for (var i = 0; i < cars.length; i++) {
          if (cars[i].id == this.state.current_car.id) {
            key = i;
            break;
          }
        }
        delete cars[i];
        self.setState({cars: cars, current_car: null});
      }
    })
  }

  renderCarsTable(cars) {
    if (cars.length <= 0) {
      return (<div>
        <Card>
          <CardBody className="text-center">
            <MaterialIcon icon="info_outline" size='large'/>
            <CardText className="text-center">
              You haven't used cars
            </CardText>
          </CardBody>
        </Card>
      </div>);
    }
    return (<table className='table table-striped'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>Kilometers</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          cars.map(car => <tr key={"car-" + car.id}>
            <td>{car.id}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.kilometers}</td>
            <td>{car.price}</td>
            <td>
              <a className="btn btn-success btn-link btn-sm" href={"/cars/" + car.id + "/edit"} role="button">
                UPDATE
              </a>
              <button className="btn btn-danger btn-link btn-sm" onClick={() => this.setState({showDialogDelete: true, current_car: car})}>
                DELETE
              </button>
            </td>
          </tr>)
        }
      </tbody>
    </table>);
  }

  render() {
    let contents = this.state.loading
      ? <p>
          <em>Loading...</em>
        </p>
      : this.renderCarsTable(this.state.cars);

    return (<div className="row">
      <div className="col-md-12">
        <h1>Used Cars</h1>
      </div>
      <div className="col-md-6">
        <a className="btn btn-success" href="/cars/add" role="button">
          <MaterialIcon icon="add" invert={true} size='small'/>
          Add New
        </a>
      </div>
      <div className="col-md-12">
        <div>
          <p></p>
          {contents}
        </div>
      </div>
      <SweetAlert showCancelButton={true} confirmButtonColor="#3085d6" cancelButtonColor="#d330000" confirmButtonText="Yes, delete it!" show={this.state.showDialogDelete} title={"Are you sure to delete the car " + (
          this.state.current_car
          ? this.state.current_car.summary
          : '') + " ? "} text="You won't be able to revert this!" type="warning" onCancel={() => this.setState({showDialogDelete: false})} onConfirm={() => this.deleteCar()}/>
    </div>);
  }
};

export default CarList;
