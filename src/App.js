import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Badge } from 'reactstrap';
import Header from "./component/header";
import Grid from "./component/grid";
import  Alertcomponent from "./component/alertcomponent";


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookingFlag : false,
            bookingIdShow: null,
            alertMsgParam: null
        };
    }

    showAlertHere = ( msg, id) => {
        this.setState({
            bookingFlag: true,
            bookingIdShow : id,
            alertMsgParam: msg
        });
    }

  render() {

    return (
      <div className="App">

        <h2>Book Your <Badge color="primary">CAB</Badge> Here</h2>
        <Header />

          {(this.state.bookingFlag) ? <Alertcomponent alertMsg={ this.state.alertMsgParam +'' + this.state.bookingIdShow }  /> : ''}

        <Grid fromAppAlertFlow = {this.showAlertHere}/>
      </div>
    );
  }
}

export default App;

/*{ FullJson:-----http://www.mocky.io/v2/5c30a87e3000003400e77a87 AND

 }*/
