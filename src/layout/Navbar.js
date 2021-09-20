import React, { useState, useContext } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Button, NavbarText } from "reactstrap";
import { Link } from "react-router-dom";
import newsContext from "../context/newsContext";

const NavBar = () => {
    const { user } = useContext(newsContext);
    const [isToggle, setIsToggle] = useState(false);
    const toggle = () => setIsToggle(!isToggle);
    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand className="mx-2" tag={Link} to="/">News App</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isToggle} navbar>
                <Nav style={{ marginLeft: "auto" }} navbar>
                    {user?.uid ?
                        <>
                            <NavItem>
                                <NavLink tag={Link} to="/profile"><Button color="link">{user.email}</Button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/logout"><Button className="btn btn-primary">Logout</Button></NavLink>
                            </NavItem>
                        </>
                        :
                        <>
                            <NavItem>
                                <NavLink tag={Link} to="/login"><Button className="btn btn-primary">Login</Button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signup"><Button className="btn btn-primary">Signup</Button></NavLink>
                            </NavItem>
                        </>
                    }
                </Nav>
            </Collapse>
        </Navbar>
    )
}


export default NavBar;