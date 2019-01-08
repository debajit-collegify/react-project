import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class Alertcomponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);

    }


    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        const {alertMsg} = this.props; // obj destructuring...
        return (
            <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                {alertMsg}
            </Alert>
        );
    }
}



Alertcomponent.defaultProps = {
    alertMsg : 'Alert Message For Default setting'
};

/*Alertcomponent.propTypes = {
    alertMsg: PropTypes.string.isRequired
};*/



export default Alertcomponent;