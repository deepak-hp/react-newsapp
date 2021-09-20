import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
    return (
        <Container fluid tag="footer" className="text-center bg-dark text-white fixed-bottom p-3">
            News App | Reactjs, NewsAPI and Firebase by <a href="https://www.linkedin.com/in/deepak-hp/" target="_blank" rel="noopener noreferrer">Deepak HP</a>
        </Container>
    )
}

export default Footer;