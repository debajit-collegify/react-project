import React from 'react';
/*import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';*/
import LoginScreen from './loginScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

/*import '../App.css';*/

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            flag:false
        }
    }
    handleClick = (e) => {
        //e.preventDefault();
        console.log("handelClick function called");
        console.log('UserName is' + this.state.username);
        console.log('Password is' + this.state.password);
        if(this.state.username ==='collegify' && this.state.password ==='1234'){
            this.setState({flag: true},
                () => {
                    console.log("state updated");
                });
        }

    }
    handelChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div className="loginDiv">
                <h3 className="sansserif">Login For Book Cab</h3>
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="fname">First Name</label>
                        </div>

                        <div className="col-75">
                            <input type="text"
                                   id="fname"
                                   name="username"
                                   placeholder="Your name.."
                                   value={this.state.username}
                                   onChange = {this.handelChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="Password">Password</label>
                        </div>
                        <div className="col-75">
                            <input type="password"
                                   id="lname"
                                   name="password"
                                   placeholder="Your password...."
                                   value={this.state.password}
                                   onChange = {this.handelChange.bind(this)}
                            />
                        </div>

                    </div>

                    <div className="row">
                        <input type="button"
                               value="Login"
                               onClick={this.handleClick.bind(this)}
                        />
                    </div>
                </form>
            </div>
                {

                    (this.state.flag) ? <LoginScreen data={this.state.flag} /> : ''
                }

            </div>


        );
    }
}
const style = {
    margin: 15,
};

export default Login;