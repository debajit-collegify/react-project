import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import ModalNested from "./nestedmodal";

class CardComponent extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        }

    }

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle /*!this.state.toggle*/
        });
    }


    render() {
        const { imgSrc ,carType , budgetPlanPerHr , cabTitle , carNUmber} = this.props.componentData;
        return (

            <div>

                <Card>
                    <CardImg top width="100%" src={imgSrc} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>CarType: <b>{carType}</b></CardTitle>
                        <CardSubtitle>Rate/hr: <b>{budgetPlanPerHr}</b></CardSubtitle>
                        <CardText>CabTitle: <b>{cabTitle}</b></CardText>
                        <CardText>CarNumber: <b>{carNUmber}</b></CardText>
                        <Button onClick={this.toggle}>Book</Button>
                    </CardBody><hr/>
                </Card>
                {
                    this.state.toggle ? <ModalNested fromAppViaGridViaCardAlertFlow = {this.props.fromAppViaGridAlertFlow} modalState={this.state.toggle} toggle={this.toggle.bind(this)} forwordCardData={this.props.componentData}/> : ''
                }
            </div>
        );
    }
}
export default CardComponent;