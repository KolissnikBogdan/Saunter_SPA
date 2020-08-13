import React, { useEffect } from "react";
import MapForm from "../Map/MapContainer";

import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addItem, selectItem } from '../../store/actions/progectActions';

import useForm from '../../hooks/useForm';
import computeDistance from '../../utils/computeDistance';
import validate from '../../utils/validationForm';

const ModalFormBody = (props) => {
    const { handleChange, handleMapChange, handleSubmit, state, errors } = useForm(
        submit,
        validate
    );

    const dispatch = useDispatch();

    function submit() {
        dispatch(addItem(state));
        dispatch(selectItem(state));
        props.onHide();
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Text input" onChange={handleChange}/>
                        <Form.Text className="text-muted text-right">
                            {errors.title && <b className="error" style={{color: 'red'}}>{errors.title}</b>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="sDescript">
                        <Form.Label>Short description</Form.Label>
                        <Form.Control as="textarea" rows="2" placeholder="Text area" onChange={handleChange}/>
                        <Form.Text className="text-muted text-right">
                            {errors.sDescript && <b className="error" style={{color: 'red'}}>{`${errors.sDescript} `}</b>} Limit {state.sDescript.length} of 160
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="fDescript">
                        <Form.Label>Full description</Form.Label>
                        <Form.Control as="textarea" rows="5" placeholder="Text area" onChange={handleChange}/>
                        <Form.Text className="text-muted text-right">
                            {errors.fDescript && <b className="error" style={{color: 'red'}}>{errors.fDescript}</b>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="pathLength" className="my-5 text-center">
                        <Form.Label style={{ fontSize: '1.5rem' }}>
                            <img
                                alt="mapImage"
                                src="https://cdn0.iconfinder.com/data/icons/map-36/20/map_marker-256.png"
                                width="20"
                                height="20"
                                className="d-inline-block align-center"
                            />{' '} Length: {state.route.length > 2 ? computeDistance(state.route) :
                            errors.pathLength && <b className="error" style={{color: 'red'}}>{errors.pathLength}</b>}
                        </Form.Label>
                    </Form.Group>

                    <Row className="justify-content-center">
                        <Button variant="outline-primary" size="lg" type="submit" >
                            <img
                                alt="checkImage"
                                src="https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/check.png"
                                width="10"
                                height="10"
                                className="d-inline-block align-center"
                            />{' '} Add path
                        </Button>
                    </Row>
                </Col>
                <Col>
                    <MapForm onMapChange={handleMapChange}/>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default ModalFormBody;