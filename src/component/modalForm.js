import React from 'react';
import { Col, Row,Button, Form, FormGroup, Label, Input, FormText ,FormFeedback } from 'reactstrap';
import axios from 'axios';
import env from '../env.json';
import  Alertcomponent from "./alertcomponent";

class ModalForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startDateText : '',
            endDateText : '',
            customerName : '',
            customerEmail : '',
            cabDetails:
                {
                    imgSrc: null,
                    carType:    null,
                    budgetPlanPerHr:    null,
                    cabTitle:   null,
                    carNUmber:  null
                },
            userDetails:
                {
                    customerName:   null,
                    customerEmail:  null
                },
            bookingDetails:
                {
                    startDate:  null,
                    endDate:    null,
                    totalValue: null,
                    bookingId:  null
                }
        };


    }
    componentDidMount() {
        this.state.cabDetails.imgSrc = this.props.forwordForwordData.imgSrc;
        this.state.cabDetails.carType = this.props.forwordForwordData.carType;
        this.state.cabDetails.budgetPlanPerHr = this.props.forwordForwordData.budgetPlanPerHr;
        this.state.cabDetails.cabTitle = this.props.forwordForwordData.cabTitle;
        this.state.cabDetails.carNUmber = this.props.forwordForwordData.carNUmber;
    }

    onChangeData = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    }

    dateDiffHere = (stDate , edDate) => {
        var date1 = new Date(stDate);
        var date2 = new Date(edDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        //alert(diffDays);
        return diffDays;
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        //console.log(this.state);

        var startDateVerify = '';
        var EndDateVerify = '';
        var nameVerify = '';
        var EmailVerify = '';


        if (this.state.startDateText === ''
            && this.state.endDateText === ''
            && this.state.customerName === ''
            && this.state.customerEmail === '') {

           /* if(this.state.startDateText === '') {
                startDateVerify = "Data required";
            }
            if(this.state.endDateText === '') {
                EndDateVerify = "Data required";
            }
            if(this.state.customerName === '') {
                nameVerify = "Data required";
            }
            if(this.state.customerEmail === '') {
                EmailVerify = "Data required";
            }*/

            return;
        }else{

            /*alert(this.state.startDateText +"-->"+
            this.state.endDateText+"-->"+
            this.state.customerName+"-->"+
            this.state.customerEmail);*/


            this.state.userDetails.customerName = this.state.customerName;
            this.state.userDetails.customerEmail = this.state.customerEmail;

            this.state.bookingDetails.startDate = this.state.startDateText;
            this.state.bookingDetails.endDate = this.state.endDateText;
            this.state.bookingDetails.totalValue = this.props.forwordForwordData.budgetPlanPerHr *
                this.dateDiffHere(this.state.startDateText , this.state.endDateText);
            this.state.bookingDetails.bookingId = "00ab1"+this.state.startDateText;

            /*console.log(this.state);*/
            this.sendMail("debajit@collegify.com","login-mail",
                "Testing Mail" ,false , {code:this.state.bookingDetails.bookingId});

            alert("Data submitted successfuly");
            this.props.confirm();
            this.props.fromAppViaGridViaCardViamodalAlertFlow("Booking confirmed with booking ID :-" , this.state.bookingDetails.bookingId);

        }

    }

    sendMail(to, mailType, subject, attachmentStatus = false, data) {
        const sendData = {
            "mailType" : mailType,
            "to" : to,
          /*  "cc" : cc,
            "bcc" : bcc,*/
            "subject" : subject,
            "attachment": attachmentStatus,
            "data": data
        }
        axios.post(`${env.MAIL_URL}/mail?_format=json`, sendData)
            .then(res => {
                //console.log(res);
            })
            .catch(error => error);
    }


    render() {
        /*{ console.log(this.state.startDateText);
            console.log(this.state.endDateText);
            console.log(this.state.customerName);
            console.log(this.state.customerEmail);

        }*/
        //console.log(this.props.forwordForwordData);
       // console.log(this.value);
        return (

            <Form>
                {/*<Alertcomponent alertMsg={"booking confirmed with booking ID :-" + this.state.bookingDetails.bookingId}  />*/}
                <Row form>
                    <Col md={6}>
                <FormGroup>
                    <Label for="exampleDate">StartDate:</Label>
                    <Input
                        type="date"
                        name="startDateText"
                        id="exampleStartDate"
                        value={this.state.startDateText}
                        onChange={this.onChangeData.bind(this)}
                        placeholder="Start date"/>
                    <FormFeedback tooltip>Data is wrong</FormFeedback>
                    <FormText>{this.startDateVerify}</FormText>
                </FormGroup>
                    </Col>
                    <Col md={6}>
                <FormGroup>
                    <Label for="exampleDate">End Date:</Label>
                    <Input
                        type="date"
                        name="endDateText"
                        id="exampleEndDate"
                        value={this.state.endDateText}
                        onChange={this.onChangeData.bind(this)}
                        placeholder="End date"/>
                    <FormFeedback tooltip>Data is wrong</FormFeedback>
                    <FormText>{this.EndDateVerify}</FormText>
                </FormGroup>
                    </Col>
                </Row>

                <FormGroup>
                    <Label for="exampleName">Customer Name:</Label>
                    <Input type="text" name="customerName" value={this.state.customerName}  onChange={this.onChangeData.bind(this)} id="exampleName" placeholder="Your Name" />
                    <FormFeedback tooltip>Data is wrong</FormFeedback>
                    <FormText>{this.nameVerify}</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Customer Email:</Label>
                    <Input type="email" name="customerEmail" value={this.state.customerEmail}  onChange={this.onChangeData.bind(this)} id="exampleemail" placeholder="Your Email" />
                    <FormFeedback tooltip>Data is wrong</FormFeedback>
                    <FormText>{this.EmailVerify}</FormText>
                </FormGroup>
                <Button onClick={this.handleSubmitForm.bind(this)}>Confirm Booking</Button>

            </Form>
        );
    }
}



export default ModalForm;