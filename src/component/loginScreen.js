import React, {Component} from 'react';
import App from '../App';
import Login from './login';


class LoginScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render() {

        return (
            <div>
                <h1>inside loginscreen component</h1>
                {
                    (this.props.data) ? <App /> : ''
                }
            </div>
        );
    }
}

export default LoginScreen;