import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Badge } from 'reactstrap';
import Header from "./component/header";
import Grid from "./component/grid";


class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Book Your <Badge color="primary">CAB</Badge> Here</h2>
        <Header />

        <Grid />
      </div>
    );
  }
}

export default App;

/*{ FullJson:-----http://www.mocky.io/v2/5c30a87e3000003400e77a87 AND

 }*/
