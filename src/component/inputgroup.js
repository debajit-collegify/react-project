import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

const InputItem = (props) => {
    return (
        <div>
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">Max:</InputGroupAddon>
                <Input />
            </InputGroup><br/>
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">Min:</InputGroupAddon>
                <Input />
            </InputGroup>
        </div>
    );
};

export default InputItem;