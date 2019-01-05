import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class FormControl extends React.Component {
    render() {
        return (
            <Form>

                <FormGroup tag="fieldset">
                    <legend>Rating</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            10-20
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            21-30
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            31-40
                        </Label>
                    </FormGroup>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}