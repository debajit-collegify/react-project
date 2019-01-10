import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardComponent from "./card";
import SideBar from "./sidebar";
import axios from 'axios';


class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            cabDetails: [],
            demoData : 'chandan'
        }

        axios.get(`http://www.mocky.io/v2/5c33093a2e00007b12121e1d`)
            .then(res => {
                console.log(res.data);
                this.setState({cabDetails : res.data});

            });

    }

    onChnage = () =>{
        console.log("hello");
    }


    render() {
        //console.log(this.state.cabDetails);
        return (
            <Container>

                <Row>
                    <Col sm="3" xs="12">
                        <Col sm="12" xs="12"><SideBar demoData={this.state.demoData} data={this.state.cabDetails} demoFunction={this.onChnage.bind(this)}/></Col>
                    </Col>
                    <Col sm="9" xs="12">
                        <Row>
                            {
                                this.state.cabDetails.map((dynamicData, i) =>
                                <Col sm="4" xs="12"><CardComponent key={i} fromAppViaGridAlertFlow = {this.props.fromAppAlertFlow}
                                componentData = {dynamicData} /></Col>)
                            }
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Grid;