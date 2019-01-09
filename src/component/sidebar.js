import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import FormControl from "./formcontrol";


export default class SideBar extends React.Component {
    render() {
        return (
            <div>
                <p className="mark">FILTERS</p>
                <Nav vertical>
                    <NavItem>
                        <NavLink>{this.props.data.length > 0 && <FormControl forwordDataCabDetails = {this.props.data}/>}</NavLink>
                    </NavItem>

                </Nav>

            </div>
        );
    }
}