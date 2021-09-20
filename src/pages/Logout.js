import React, { useContext, useEffect } from "react"
import { Redirect } from "react-router";
import newsContext from "../context/newsContext"

const Logout = () => {
    const { setUser } = useContext(newsContext);
    useEffect(() => {
        setUser(null)
        console.log("logout success!")
    })

    return (
        <Redirect to="/" />
    )
}

export default Logout