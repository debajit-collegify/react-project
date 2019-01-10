import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CardComponent from "./card";
import SideBar from "./sidebar";
import axios from 'axios';
import _ from "lodash";


class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            cabDetails: [],
            cabDetailsFilter: [],
            demoData : '',
            sideBarFormstateMinPrice: '',
            sideBarFormstateMaxPrice: '',
            sideBarFormstateSelectValue: '',
            sideBarFormstateRateLeft: '',
            sideBarFormstateRateRight: ''
        }

        this.validateSidebarStateData = this.validateSidebarStateData.bind(this);



        axios.get(`http://www.mocky.io/v2/5c33093a2e00007b12121e1d`)
            .then(res => {
                console.log(res.data);
                this.setState({cabDetails : res.data});

            });

    }

    onChnage = (sideBarFormstate) =>{

        if(sideBarFormstate.rate !== null){
            var res = sideBarFormstate.rate.split("-");
            this.setState({
                    sideBarFormstateMinPrice : sideBarFormstate.minPrice,
                    sideBarFormstateMaxPrice : sideBarFormstate.maxPrice,
                    sideBarFormstateSelectValue : sideBarFormstate.selectValue,
                    sideBarFormstateRateLeft : res[0],
                    sideBarFormstateRateRight : res[1]},
                () => {
                    this.validateSidebarStateData();
                    //console.log("state set");
                }

            );
        }else{
            this.setState({sideBarFormstateRateLeft : '1',
                sideBarFormstateRateRight : '1'},
                () => {
                    console.log("rate data is blank");
                    this.validateSidebarStateData();
                })

        }


    }

    validateSidebarStateData = () => {
        if(this.state.sideBarFormstateMinPrice.length > 0 || this.state.sideBarFormstateMaxPrice.length > 0
        || this.state.sideBarFormstateSelectValue.length > 0 || this.state.sideBarFormstateRateLeft.length > 0
        || this.state.sideBarFormstateRateRight.length > 0){

            if(this.state.sideBarFormstateMinPrice.length > 0)
            {
                var a = _.filter(this.state.cabDetails, { "cabTitle": "Maruti Alto" , "carType" : "Mini" });
            }



            console.log("validation working");

        }else{

            console.log("Form value blank");
            return false;
        }
    }


    render() {
        console.log(this.state.cabDetails);
        return (
            <Container>

                <Row>
                    <Col sm="3" xs="12">
                        <Col sm="12" xs="12"><SideBar demoData={this.state.demoData}
                        data={this.state.cabDetails} demoFunction={this.onChnage.bind(this)}/></Col>
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