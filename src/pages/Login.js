import React, { useContext, useState } from "react";
import { Container, Button, FormGroup, Label, Input, Form } from "reactstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import newsContext from "../context/newsContext";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
    const { user, setUser } = useContext(newsContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (event) => {
        if (event.target.value)
            setEmail(event.target.value);
        else
            setEmail("");
    }
    const handlePassword = (event) => {
        if (event.target.value)
            setPassword(event.target.value);
        else
            setPassword("");
    }
    const handlerLogin = (event) => {
        event.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user);
            })
            .catch(error => {
                console.log(error.code + ": " + error.message);
                toast(error.message, { type: "warning" })
            })
    }

    return (
        <Container className="p-3">
            {
                user?.uid ?
                    <Redirect to="/" />
                    :
                    <Form onSubmit={handlerLogin}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="email" className="mr-sm-2">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="email@email.com" value={email} onChange={handleEmail} required />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="password" className="mr-sm-2">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="***" value={password} onChange={handlePassword} required />
                        </FormGroup>
                        <Button block className="mt-2">Login</Button>
                    </Form>
            }
        </Container>
    )
}

export default Login;