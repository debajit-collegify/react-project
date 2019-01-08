import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalForm from './modalForm';

class ModalNested extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.props.modalState}>
                    <ModalHeader>Booking Details</ModalHeader>
                    <ModalBody>
                        <ModalForm fromAppViaGridViaCardViamodalAlertFlow = {this.props.fromAppViaGridViaCardAlertFlow} confirm={this.props.toggle.bind(this)} forwordForwordData={this.props.forwordCardData}/>
                        <br />
                        {/*{console.log(this.props.forwordCardData)}*/}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalNested;