import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import CarList  from './components/cars/list';
import CarCreate from './components/cars/create';
import CarEdit from './components/cars/edit';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={CarList} />
        <Route path='/cars/add' component={CarCreate} />
        <Route path='/cars/:carID/edit' component={CarEdit} />
      </Layout>
    );
  }
}
