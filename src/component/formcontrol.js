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
            rating: []      /*props.forwordDataCabDetails*/
        };


    }

    componentWillMount() {
        this.state.rating = this.props.forwordDataCabDetails;
        var rates = [];
        console.log(this.props);
        this.props.forwordDataCabDetails.map(function(value , key) {
            rates.push(value.budgetPlanPerHr)
        });
        //_.values method to convert object to array.
        this.setState({rating : rates});
        console.log( this.state.rating);
       // alert(this.state.rating);
        /*var arrRate = this.state.rating;
        var maximum = _.max(arrRate);
        console.log(maximum);
        alert(maximum);*/
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleChange =(e) =>{
        this.setState({selectValue: e.target.value});
        alert("working with handelChange for dropdown" + this.state.selectValue);
    }
    onChangeData = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleSubmitForm = (e) => {
        e.preventDefault();
        alert("working with submit form");
    }



render() {
    console.log(this.state.rating);
        return(

            <Form>

                {/*Input group*/}

                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Max:</InputGroupAddon>
                    <Input
                        type="text"
                        name="maxPrice"
                        value={this.state.maxPrice}
                        onChange={this.onChangeData.bind(this)}
                        id="examplePriceMax"/>
                </InputGroup><br/>
                <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">Min:</InputGroupAddon>
                    <Input
                        type="text"
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


                {/*Radio button*/}

                <FormGroup tag="fieldset">
                    <legend>Rating</legend>
                    <FormGroup check>
                        <Label check>



                            <Input
                                type="radio"
                                name="rating"
                                value="10-20"
                                checked={this.state.rating === '10-20'}
                                onChange={this.onChangeData.bind(this)}
                            />
                            10-20
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="rating"
                                value='21-30'
                                checked={this.state.rating === '21-30'}
                                onChange={this.onChangeData.bind(this)}
                            />
                            21-30
                        </Label>
                    </FormGroup>
                </FormGroup>
                <Button onClick={this.handleSubmitForm.bind(this)}>Submit</Button>
            </Form>
        );

    }
}

export default FormControl;
