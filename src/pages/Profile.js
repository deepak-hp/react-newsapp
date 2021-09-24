import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import newsContext from "../context/newsContext";

const Profile = () => {
    const { user, setUser } = useContext(newsContext);
    return (
        <Container>
            {user ?
                <Row className="mt-3">
                    <Col md={6} >
                        <h3>Profile details</h3>
                        <p>{`Name: ${user.displayName}`}</p>
                        <p>{`Email: ${user.email}`}</p>
                    </Col>
                    <Col md={6}>
                        <h3>FavList here</h3>
                        <ListGroup>
                            {user?.favNews !== null ? user?.favNews.map(news => (
                                <ListGroupItem key={news.url}>
                                    <p>{news.title}</p>
                                    <a href={news.url} target="_blank" rel="noreferrer">Click to read the article.</a>
                                </ListGroupItem>
                            )) : null}
                        </ListGroup>
                    </Col>
                </Row>
                : <Redirect to="/" />}
        </Container>

    )
}

export default Profile;