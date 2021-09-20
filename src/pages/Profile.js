import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { Container, Row, Col, } from "reactstrap";
import newsContext from "../context/newsContext";

const Profile = () => {
    const { user, setUser } = useContext(newsContext);
    // const { favNews } = user;
    return (
        <Container>
            {user ?
                <Row className="mt-3">
                    <Col md={6} >
                        <h3>Profile details here</h3>
                        <p>{`Name: ${user.displayName}`}</p>
                        <p>{`Email: ${user.email}`}</p>
                    </Col>
                    <Col md={6}>
                        <h3>FavList here, add the list of fav news</h3>
                        {user?.favNews !== null ? user?.favNews.map(news => (
                            <div key={news.url}>
                                <p>{news.title}</p>
                                <a href={news.url} target="_blank" rel="noreferrer">Click to read the article.</a>
                            </div>
                        )) : null}
                    </Col>
                </Row>
                : <Redirect to="/" />}
        </Container>

    )
}

export default Profile;