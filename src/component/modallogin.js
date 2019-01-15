import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, FormText ,FormFeedback } from 'reactstrap';

class ModalLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            isOpen :false,
            username:'',
            password:'',
            isLogIn: false,
            loginCredential : false,
            loginMsg : null
        };

        this.toggle = this.toggle.bind(this);
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

    handleClick = (e) => {
        e.preventDefault();

        console.log('UserName is' + this.state.username);
        console.log('Password is' + this.state.password);
        console.log("login button working inside modal");

        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state , () => {
        });

        if(this.state.username === "collegify" && this.state.password === "0000"){
            this.setState({loginCredential:true}, () => {

                this.toggle();
            });

        }else{
            this.setState({loginMsg : "UserId Or Password Not Matched"});
        }
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