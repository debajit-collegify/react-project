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
            sideBarFormstateRateLeft: '1',
            sideBarFormstateRateRight: '1'
        }

        this.validateSidebarStateData = this.validateSidebarStateData.bind(this);



        axios.get(`http://www.mocky.io/v2/5c33093a2e00007b12121e1d`)
            .then(res => {
                console.log(res.data);
                this.setState({cabDetails : res.data});

            });

    }


    onChnage = (sideBarFormstate) =>{

        if(this.state.sideBarFormstateRateLeft !== null && this.state.sideBarFormstateRateRight !== null){
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
                this.setState({
                        sideBarFormstateMinPrice : sideBarFormstate.minPrice,
                        sideBarFormstateMaxPrice : sideBarFormstate.maxPrice,
                        sideBarFormstateSelectValue : sideBarFormstate.selectValue,
                        sideBarFormstateRateLeft : '1',
                        sideBarFormstateRateRight : '1'},
                    () => {
                        this.validateSidebarStateData();
                        //console.log("state set");
                    })
            }

        }

        /*else{
            this.setState({sideBarFormstateRateLeft : '1',
                    sideBarFormstateRateRight : '1'},
                () => {
                    console.log("rate data is blank");
                    this.validateSidebarStateData();
                })

        }*/


    }


    validateSidebarStateData = () => {
        const parentThis = this;
        if(this.state.sideBarFormstateMinPrice !== null || this.state.sideBarFormstateMaxPrice !== null
        || this.state.sideBarFormstateSelectValue !== null || this.state.sideBarFormstateRateLeft !== null
        || this.state.sideBarFormstateRateRight !== null){


            //Single value check maxPrice Start

            if(this.state.sideBarFormstateMaxPrice !== null)
            {
                var temp = [];
                var loopArr = this.state.cabDetails;
                _.forEach(loopArr, function(value, key) {
                    _.forEach(value, function(val , k){
                        if(k === "budgetPlanPerHr")
                        {

                            if(val > 0 && val <= parseInt(parentThis.state.sideBarFormstateMaxPrice)){
                                //console.log(key +':------'+ value);
                                temp.push(value);
                            }
                        }

                    });

                });

                this.setState({cabDetailsFilter : temp});

            }else if(this.state.sideBarFormstateMinPrice !== null)
            {
                var temp = [];
                var loopArr = this.state.cabDetails;
                _.forEach(loopArr, function(value, key) {
                    _.forEach(value, function(val , k){
                        if(k === "budgetPlanPerHr")
                        {

                            if(val > 0 && val <= parseInt(parentThis.state.sideBarFormstateMinPrice)){
                                //console.log(key +':------'+ value);
                                temp.push(value);
                            }
                        }

                    });

                });

                this.setState({cabDetailsFilter : temp});

            }else if(this.state.sideBarFormstateMinPrice !== null && this.state.sideBarFormstateMaxPrice !== null){

                var temp = [];
                var loopArr = this.state.cabDetails;
                _.forEach(loopArr, function(value, key) {
                    _.forEach(value, function(val , k){
                        if(k === "budgetPlanPerHr")
                        {

                            if(val >= parseInt(parentThis.state.sideBarFormstateMinPrice) && val <= parseInt(parentThis.state.sideBarFormstateMaxPrice)){
                                //console.log(key +':------'+ value);
                                temp.push(value);
                            }
                        }

                    });

                });

                this.setState({cabDetailsFilter : temp});
            }

            //--------------Single value check minPrice END------------------------------------------

        }else{

            //console.log("Form value blank");
            return false;
        }

    }


    render() {
        /*console.log("In render method");
        console.log(this.state.cabDetailsFilter);
        console.log(this.state.cabDetails);*/

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
                                (this.state.cabDetailsFilter.length === 0) ?
                                    this.state.cabDetails.map((dynamicData, i) =>
                                     <Col sm="4" xs="12"><CardComponent key={i} fromAppViaGridAlertFlow = {this.props.fromAppAlertFlow}
                                     componentData = {dynamicData} /></Col>) :

                                    this.state.cabDetailsFilter.map((dynamicData, i) =>
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