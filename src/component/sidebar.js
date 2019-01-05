import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import InputItem from "./inputgroup";
import BtnDropDown from "./buttondropdown";
import FormControl from "./formcontrol";


export default class SideBar extends React.Component {
    render() {
        return (
            <div>
                <p className="mark">FILTERS</p>
                <Nav vertical>
                    <NavItem>
                        <NavLink><InputItem /></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><BtnDropDown /></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><FormControl /></NavLink>
                    </NavItem>

                </Nav>

            </div>
        );
    }
}