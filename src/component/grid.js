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
            sideBarFormstateRateRight: '1',
            sideBarFormStateCheckBoxMin:null,
            sideBarFormStateCheckBoxMax:null
        }

        this.minMaxSectionFilter = this.minMaxSectionFilter.bind(this);
        this.validateSidebarStateData = this.validateSidebarStateData.bind(this);
        this.typeSectionfilter = this.typeSectionfilter.bind(this);
        this.checkBoxSectionFilter = this.checkBoxSectionFilter.bind(this);


        //Axios call to get data from API

        axios.get(`http://www.mocky.io/v2/5c33093a2e00007b12121e1d`)
            .then(res => {
                console.log(res.data);
                this.setState({cabDetails : res.data , cabDetailsFilter : res.data});

            });

    }




    //Sidebar filter form events called from formcontrol page.

    onChnage = (sideBarFormstate) =>{

        this.setState({
                sideBarFormstateMinPrice : sideBarFormstate.minPrice,
                sideBarFormstateMaxPrice : sideBarFormstate.maxPrice,
                sideBarFormstateSelectValue : sideBarFormstate.selectValue,
                sideBarFormStateCheckBoxMin : sideBarFormstate.checkBoxMinValue,
                sideBarFormStateCheckBoxMax : sideBarFormstate.checkBoxMaxValue,

            },
            () => {
                this.validateSidebarStateData();
                console.log("submit button clicked");

            }

        );



}

    minMaxSectionFilter = () => {
        const parentThis = this;
        if(this.state.sideBarFormstateMinPrice !== null || this.state.sideBarFormstateMaxPrice !== null){

            if(this.state.sideBarFormstateMaxPrice !== null)
            {
               var loopArr = this.state.cabDetailsFilter;
               var filterdataMaxPrice =  this.state.cabDetailsFilter.filter( (value) => {
                    return value.budgetPlanPerHr <= parentThis.state.sideBarFormstateMaxPrice;
                });
                console.log(filterdataMaxPrice);

                this.setState({cabDetailsFilter : filterdataMaxPrice});

            }


            if(this.state.sideBarFormstateMinPrice !== null)
            {
                var loopArr = this.state.cabDetailsFilter;
                var filterdataMinPrice =  this.state.cabDetailsFilter.filter( (value) => {
                    return value.budgetPlanPerHr >= parentThis.state.sideBarFormstateMinPrice;
                });
                //console.log(filterdataMinPrice);

                this.setState({cabDetailsFilter : filterdataMinPrice});

            }

            if(this.state.sideBarFormstateMinPrice !== null && this.state.sideBarFormstateMaxPrice !== null){

                var loopArr = this.state.cabDetailsFilter;
                var filterdataMaxPriceMinPrice =  this.state.cabDetailsFilter.filter( (value) => {
                    return value.budgetPlanPerHr >= parentThis.state.sideBarFormstateMinPrice &&
                        value.budgetPlanPerHr <= parentThis.state.sideBarFormstateMaxPrice;
                });
                console.log(filterdataMaxPriceMinPrice);

                this.setState({cabDetailsFilter : filterdataMaxPriceMinPrice});

            }


        }else{

            return false;
        }

    }

    typeSectionfilter = () => {
        const parentThis = this;
        if(this.state.sideBarFormstateSelectValue !== null){

            var loopArr = this.state.cabDetailsFilter;
            var filterdataCarType =  this.state.cabDetailsFilter.filter( (value) => {
                return value.carType === parentThis.state.sideBarFormstateSelectValue;
            });
            //console.log(filterdataCarType);

            this.setState({cabDetailsFilter : filterdataCarType});

        }else{

            return false;
        }

    }

    checkBoxSectionFilter = () => {

        const parentThis = this;
        if(this.state.sideBarFormStateCheckBoxMin !== null && this.state.sideBarFormStateCheckBoxMax !== null){

            var loopArr = this.state.cabDetailsFilter;
            var filterdataCheckBox =  this.state.cabDetailsFilter.filter( (value) => {
                return value.budgetPlanPerHr >= parentThis.state.sideBarFormStateCheckBoxMin
                    && value.budgetPlanPerHr <= parentThis.state.sideBarFormStateCheckBoxMax;
            });
            //console.log(filterdataCheckBox);

            this.setState({cabDetailsFilter : filterdataCheckBox});

        }else{

            return false;
        }

}

    validateSidebarStateData = () => {
        this.setState({cabDetailsFilter : this.state.cabDetails},

            () => {

                this.minMaxSectionFilter();
                this.typeSectionfilter();
                this.checkBoxSectionFilter();
                console.log("validate function called");
            });

        //console.log("validation function called successfuly");

    }


    render() {
        
        return (
            <Container>
                <hr/>

                <Row>
                    <Col sm="3" xs="12">
                        <Col sm="12" xs="12"><SideBar demoData={this.state.demoData}
                        data={this.state.cabDetails} demoFunction={this.onChnage.bind(this)}/></Col>
                    </Col>
                    <Col sm="9" xs="12">
                        <Row>
                            {
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