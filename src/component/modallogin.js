import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, FormText ,FormFeedback } from 'reactstrap';
import axios from 'axios';

class ModalLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            isOpen :true,
            username:'',
            password:'',
            isLogIn: false,
            loginMsg : null
        };

        this.toggle = this.toggle.bind(this);
        this.parseJwt = this.parseJwt.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            isOpen :!this.state.isOpen,
            username:'',
            password:'',
            loginMsg : null
        });
    }

    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    handleClick = (e) => {
        e.preventDefault();

        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state , () => {
        });

        //Section Axios call to validate user for login:--

       var bodyParameters = {

            "email" : this.state.username,
            "password" : this.state.password,
            "loginType":"backend"
        }

        axios.post(
            'http://18.188.170.189:3000/api/v1/user/login?_format=json', bodyParameters).then((response) => {

                console.log(response);
                if(response.status === 200){
                   localStorage.setItem('userKey', response.data.data.accessToken);

                    //console.log(JSON.parse(localStorage.getItem('userKey')));
                    //localStorage.removeItem('userKey');

                    let tokenData = this.parseJwt(localStorage.getItem('userKey'));
                    let firstName = tokenData.firstName;
                    let lastName = tokenData.lastName;
                    let name = firstName + ''+ lastName;
                    //localStorage.setItem('userName' , JSON.stringify(name));
                    //console.log(JSON.parse(localStorage.getItem('userName')));
                    this.props.data(name);

                    this.toggle();

                }

        }).catch((error) => {
                console.log(error);
            this.setState({loginMsg : "UserId OR Password Does'nt Matched"});
        });


    }
    onChangeData = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Login To Book Cab</ModalHeader>
                    {
                        (this.state.loginMsg !== null) ? this.state.loginMsg : null
                    }
                    <ModalBody>
                        {/*Login Modal Form Start Here*/}
                        <Form>

                            <FormGroup>
                                <Label for="exampleName">UserName:</Label>
                                <Input type="text"
                                       name="username"
                                       value={this.state.username}
                                       onChange={this.onChangeData.bind(this)}
                                       id="exampleName"
                                       placeholder="Your Username OR Email" />
                                {/*<FormFeedback tooltip>Data is wrong</FormFeedback>
                                <FormText>{this.state.nameVerify}</FormText>*/}
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password:</Label>
                                <Input type="password"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.onChangeData.bind(this)}
                                       id="exampleemail"
                                       placeholder="Your Password" />
                                {/*<FormFeedback tooltip>Data is wrong</FormFeedback>
                                <FormText>{this.state.EmailVerify}</FormText>*/}
                            </FormGroup>


                        </Form>

                        {/*Login Modal Form End Here*/}



                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleClick.bind(this)}>Login</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalLogin;