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



class FormControl extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            maxPrice: null,
            minPrice: null,
            selectValue : null,
            rating: "10-20"
        };
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
        alert("working with submit form form");
    }


    render() {
        console.log(this.state);
        return (
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
                </InputGroup><hr/>


                {/*dropDown*/}
                <label className="label">Car Type</label>
                <select className="custom-select"
                        value={this.state.selectValue}
                        onChange={this.handleChange.bind(this)}>
                    <option value=""></option>
                    <option value="Prime">Prime</option>
                    <option value="Sedan">Sedan</option>
                </select>


                {/*Radio button*/}

                <FormGroup tag="fieldset">
                    <legend>Rating</legend>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="rating"
                                value= "10-20"
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
                <Button onClick={this.onChangeData.bind(this)}>Submit</Button>
            </Form>
        );
    }
}

export default FormControl;
