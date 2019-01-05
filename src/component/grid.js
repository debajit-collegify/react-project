import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardComponent from "./card";
import SideBar from "./sidebar";

export default class Grid extends React.Component {
    render() {
        return (
            <Container>

                <Row>
                    <Col sm="3" xs="12"><SideBar /></Col>
                    <Col  sm="3" xs="12"><CardComponent /></Col>
                    <Col  sm="3" xs="12"><CardComponent /></Col>
                    <Col  sm="3" xs="12"><CardComponent /></Col>
                </Row>

            </Container>
        );
    }
}