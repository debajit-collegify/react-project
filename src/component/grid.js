import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardComponent from "./card";
import SideBar from "./sidebar";
import axios from 'axios';


class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            cabDetails: []
        }

        axios.get(`http://www.mocky.io/v2/5c33093a2e00007b12121e1d`)
            .then(res => {
                this.setState({cabDetails : res.data});

            });

    }

    render() {
        //console.log(this.state.cabDetails);
        return (
            <Container>

                <Row>
                    <Col sm="3" xs="12">
                        <Col sm="12" xs="12"><SideBar /></Col>
                    </Col>
                    <Col sm="9" xs="12">
                        <Row>
                            {
                                this.state.cabDetails.map((dynamicData, i) =>
                                <Col sm="4" xs="12"><CardComponent fromAppViaGridAlertFlow = {this.props.fromAppAlertFlow}
                                 key={i} componentData = {dynamicData} /></Col>)
                            }
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Grid;