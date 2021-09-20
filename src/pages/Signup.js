import React, { useState, useContext } from "react";
import { Container, FormGroup, Form, Label, Input, Button } from "reactstrap";
import newsContext from "../context/newsContext";
import { toast } from "react-toastify";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Redirect } from "react-router";

const Signup = () => {
    const { user, setUser } = useContext(newsContext);
    const [uName, setUName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUName = (event) => {
        if (event.target.value)
            setUName(event.target.value);
        else
            setUName("");
    }

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
            setPassword("")
    }
    const handleSignup = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential);
                setUser(userCredential.user);
            })
            .catch(error => {
                console.log(error.code + ": " + error.message);
                toast(error.message, { type: "warning" })
            })
        // console.log("currentUser: " + JSON.stringify(auth))
        // if (user?.uid) {
        //     console.log("in updateProfile");
        //     await updateProfile(auth.currentUser, {
        //         displayName: uName
        //     }).then(() => {
        //         console.log("uName updated");
        //         setUser(uName);
        //     }).catch(err => {
        //         console.log(err.message);
        //         toast(err.message, { type: "warning" })
        //     })
        // }

        console.log("user: " + user);
    }
    return (
        <Container>
            {
                user?.uid ?
                    <Redirect to="/" />
                    :
                    <Form onSubmit={handleSignup}>
                        {/* <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label>User Name: </Label>
                            <Input type="text" name="uname" id="uname" placeholder="Lit Maga" value={uName} onChange={handleUName} required />
                        </FormGroup> */}
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="email" className="mr-sm-2">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="email@email.com" value={email} onChange={handleEmail} required />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label htmlFor="password" className="mr-sm-2">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="***" value={password} onChange={handlePassword} required />
                        </FormGroup>
                        <Button block className="mt-2">Signup</Button>
                    </Form>

            }

        </Container>
    )
}

export default Signup;