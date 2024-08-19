import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Form } from 'react-bootstrap';
import hotelAxios from "../../apis/HotelAxios";

export const Registration = () => {

    const [user, setUser] = useState({
        usernameInit: "",
        eMailInit: "",
        nameInit: "",
        surnameInit: "",
        passwordInit: "",
        repeatedPasswordInit: "",
    });

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const inputValue = (e) => {
        let input = e.target;
        let name = input.name;
        let value = input.value;

        setError({ ...error, [name]: "" });

        setUser({
            ...user,
            [name]: value
        });
    };

    const post = () => {

        let newError = {};

        if (!user.usernameInit) {
            newError.usernameInit = "Enter username!";
        }

        if (!user.eMailInit) {
            newError.eMailInit = "Enter eMail!";
        }
        if (!user.nameInit) {
            newError.nameInit = "Entrer name!";
        }

        if (!user.surnameInit) {
            newError.surnameInit = "Enter surname!";
        }
        if (!user.passwordInit) {
            newError.passwordInit = "Enter password!";
        }
        if (!user.repeatedPasswordInit) {
            newError.repeatedPasswordInit = "Enter a repeated password";
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        const dto = {
            username: user.usernameInit,
            eMail: user.eMailInit,
            name: user.nameInit,
            surname: user.surnameInit,
            password: user.passwordInit,
            repeatPassword: user.repeatedPasswordInit
        };

        console.log(dto);
        hotelAxios.post('/users', dto)
            .then(res => {
                console.log(res);
                alert("Successful registration");
                navigate("/products");
            })
            .catch(error => {
                console.log(error);
                navigate("/registration");
            });
    };

    return (
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
            <Row className="justify-content-center">
                <Col md={6} className="registration-form">
                    <h2 style={{color:'white'}}>Registration</h2>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6} className="form-group">
                                <Form.Label htmlFor="usernameInit">Username</Form.Label>
                                <Form.Control type="text" name="usernameInit" id="usernameInit" onChange={inputValue} />
                                {error.usernameInit && <span style={{ color: "red" }}>{error.usernameInit}</span>}
                            </Col>
                            <Col md={6} className="form-group">
                                <Form.Label htmlFor="eMailInit">E-mail</Form.Label>
                                <Form.Control type="text" name="eMailInit" id="eMailInit" onChange={inputValue} />
                                {error.eMailInit && <span style={{ color: "red" }}>{error.eMailInit}</span>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6} className="form-group">
                                <Form.Label htmlFor="nameInit">Name</Form.Label>
                                <Form.Control type="text" name="nameInit" id="nameInit" onChange={inputValue} />
                                {error.nameInit && <span style={{ color: "red" }}>{error.nameInit}</span>}
                            </Col>
                            <Col md={6} className="form-group">
                                <Form.Label htmlFor="surnameInit">Surname</Form.Label>
                                <Form.Control type="text" name="surnameInit" id="surnameInit" onChange={inputValue} />
                                {error.surnameInit && <span style={{ color: "red" }}>{error.surnameInit}</span>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6} className="form-group">
                                <Form.Label htmlFor="passwordInit">Password</Form.Label>
                                <Form.Control type="password" name="passwordInit" id="passwordInit" onChange={inputValue} />
                                {error.passwordInit && <span style={{ color: "red" }}>{error.passwordInit}</span>}
                            </Col>
                            <Col md={6} className="form-group">
                                <Form.Label htmlFor="repeatedPasswordInit">Repeat Password</Form.Label>
                                <Form.Control type="password" name="repeatedPasswordInit" id="repeatedPasswordInit" onChange={inputValue} />
                                {error.repeatedPasswordInit && <span style={{ color: "red" }}>{error.repeatedPasswordInit}</span>}
                            </Col>
                        </Row>
                        <Button className="registration-button" onClick={post}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
