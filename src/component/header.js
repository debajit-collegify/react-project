import React from 'react';
import '../App.css';
import ModalLogin from './modallogin';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            modal: false,
            loginStatus : false,
            localStorageName : ''
        };
        this.handelLogout = this.handelLogout.bind(this);
        this.handelModalLogin = this.handelModalLogin.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            modal: !this.state.modal
        });
    }

    handelLogout = () => {
        this.setState({loginStatus: false , localStorageName : ''},
            () => {
                localStorage.clear();
            });

        console.log("logout Clicked");
    }
    handelModalLogin = (name) => {


        this.setState({loginStatus : true,localStorageName : name},
            () => {

                //console.log("handelModalLogin clicked " + this.state.loginStatus);

            });
    }
    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }
    componentDidMount() {

        if(localStorage.getItem('userKey')){

            var tokenData = this.parseJwt(localStorage.getItem('userKey'));
            var firstName = tokenData.firstName;
            var lastName = tokenData.lastName;
            var name = firstName + ''+ lastName;
            this.setState({loginStatus : true,localStorageName : name},
                () => {

                    //console.log("handelModalLogin clicked " + this.state.loginStatus);

                });
        }

    }

    render() {
        return (
            <div>

                <Navbar color="info" light expand="md">
                    <NavbarBrand >CAB Booking</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {
                                    (this.state.loginStatus)?
                                        (<NavLink className="loginLink" onClick={this.handelLogout}>Logout</NavLink>):
                                        (<NavLink className="loginLink" onClick={this.toggle}>Login</NavLink>)
                                }

                            </NavItem>
                            <NavItem>
                                <span>
                                    {(this.state.loginStatus) ? "Welcome " + this.state.localStorageName : '' }
                                </span>
                            </NavItem>


                            {
                                (this.state.modal) ? <ModalLogin data={this.handelModalLogin} /> : ''
                            }

                            {/*<UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>*/}
                        </Nav>
                    </Collapse>
                </Navbar>

            </div>
        );
    }
}

export default Header;