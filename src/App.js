import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import Login from './components/Login';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => (<Login
          { ...props }
        />) }
      />
    </Switch>

  );
}

export default App;
