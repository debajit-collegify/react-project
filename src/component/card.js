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
        return (
            <div>
                <Card>
                    <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button onClick={this.toggle}>Book</Button>
                    </CardBody>
                </Card>
                {
                    this.state.toggle ? <ModalNested modalState={this.state.toggle} toggle={this.toggle.bind(this)}/> : ''
                }
            </div>
        );
    }
}
export default CardComponent;