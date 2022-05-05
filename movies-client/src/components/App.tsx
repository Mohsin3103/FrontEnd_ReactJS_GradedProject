import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './global/Navigation';
import Home from './global/Home';
import About from './global/About';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesList from './MoviesList/MoviesList';
import MoviesDetails from './Details/MovieDetails';
import NoMatch from './global/NoMatch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navigation/>
      <Container className="my-4">
          <Switch>
            <Route path="/about" component={About}/>
            <Route path="/:moviesCategory/:path" component={MoviesDetails}/>
            <Route path="/:moviesCategory" component={MoviesList}/>
            <Route path="/" component={Home}/>
          </Switch>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default App;
