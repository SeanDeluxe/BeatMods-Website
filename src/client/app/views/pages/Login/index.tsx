import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";

export default class Login extends Component<{ history: any }, { username: string; password: string }> {
    async onSubmit() {
        const { data, status } = await axios({
            method: "post",
            url: "/api/v1/signIn",
            data: {
                username: this.state.username,
                password: this.state.password
            }
        });
        if (status !== 200 && "key" in data && "data" in data) {
            console.error(`${data.httpStatus} Error`, data.key, data.data);
        }
        if (status === 200 && "_id" in data) {
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                this.onSubmit();
                                            }}
                                        >
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" autoComplete="username" onChange={e => this.setState({ username: e.target.value })} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    onChange={e => this.setState({ password: e.target.value })}
                                                />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">
                                                        Login
                                                    </Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button
                                                        onClick={() => {
                                                            this.props.history.push("/mods");
                                                        }}
                                                        color="link"
                                                        className="px-0"
                                                    >
                                                        Back to homepage
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary p-4">
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Register an account to be able to upload your own mods</p>
                                            <Link to="/register">
                                                <Button color="primary" className="mt-3" active={true} tabIndex={-1}>
                                                    Register Now!
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
