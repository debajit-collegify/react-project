import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon

} from 'reactstrap';
import _ from "lodash";




class FormControl extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            maxPrice: null,
            minPrice: null,
            selectValue : null,
            rating: [],      /*props.forwordDataCabDetails*/
            intrValArrState: [],
            rate: null
        };


    }


    dynamicRateBarCalculation = (max,min,interval) => {
        //console.log(max+'----------------------'+min);
        //var loopLength = Math.floor(((max-min)/10));
        var j=0;
        var chart = [];
        for(j= parseInt(min) ; j < parseInt(max) ; j+=parseInt(interval)){
            if(j === parseInt(min)){
                chart.push(j +'-'+ (j+parseInt(interval)));
            }else{
                if(j < parseInt(max) && (j+parseInt(interval)) > parseInt(max)){
                    chart.push((j+1) +'-' + parseInt(max));
                }else{
                    chart.push((j+1) +'-'+ (j+parseInt(interval)));
                }

            }
        }

        return chart;

    }

    componentWillMount() {

        this.state.rating = this.props.forwordDataCabDetails;
        var rates = [];
        this.props.forwordDataCabDetails.map(function(value , key) {
            rates.push(value.budgetPlanPerHr)
        });

        /*this.setState({rating : rates}, () => {
            max = _.max(this.state.rating);
        });*/
        this.setState({rating : rates});
        var max = _.max(rates);
        var min = _.min(rates);
        var intervalArr = this.dynamicRateBarCalculation(max,min,10);
        this.setState({intrValArrState: intervalArr});
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleChange =(e) =>{
        this.setState({selectValue: e.target.value});
        //alert("working with handelChange for dropdown" + this.state.selectValue);
    }
    onChangeData = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleSubmitForm = (e) => {
        e.preventDefault();

        this.props.onChnage(this.state);

        //alert("working with submit form");
    }



render() {
    //console.log(this.state);
    const parentThis = this;
    //console.log(this.props.demoData)
    return(

            <Form>

                {/*Input group*/}

                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Max:</InputGroupAddon>
                    <Input
                        type="number"
                        pattern="[0-9.]*"
                        name="maxPrice"
                        value={this.state.maxPrice}
                        onChange={this.onChangeData.bind(this)}
                        id="examplePriceMax"/>
                </InputGroup><br/>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Min:</InputGroupAddon>
                    <Input
                        type="number"
                        pattern="[0-9.]*"
                        name="minPrice"
                        value={this.state.minPrice}
                        onChange={this.onChangeData.bind(this)}
                        id="examplePriceMin"/>
                </InputGroup>
                <hr/>


                {/*dropDown*/}

                <label className="label">Car Type</label>
                <select className="custom-select"
                        value={this.state.selectValue}
                        onChange={this.handleChange.bind(this)}>

                    {

                        this.props.forwordDataCabDetails.map(function(val , key) {
                            return <option key={key} value={val.carType}>{val.carType}</option>
                        })
                        /* _.forEach(this.props.forwordDataCabDetails , function (value) {
                             _.forEach(value , function (val, key) {
                                 if (key === "carType") {
                                     return <option value={val}>{val}</option>
                                 }
                             });
                         })*/

                    }

                </select>
                <hr/>


                {/*Radio button*/}

                <FormGroup tag="fieldset">
                    <legend>Pricing</legend>

                    {
                        this.state.intrValArrState.map(function(val , key) {
                            return <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="rate"
                                        key={key} value={val}
                                        onChange={parentThis.onChangeData.bind(this)}
                                    />
                                    {val}
                                </Label>
                            </FormGroup>
                        })
                    }


                </FormGroup>
                <Button onClick={this.handleSubmitForm.bind(this)}>Submit</Button>
            </Form>
        );

    }
}

export default FormControl;
