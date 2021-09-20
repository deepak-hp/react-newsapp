import React, { useState, useEffect, useContext } from "react";
import News from "./News";
import newsContext from "../context/newsContext";
import { Redirect } from "react-router";

const Home = () => {
    const { user } = useContext(newsContext);
    const [latestnews, setLatestNews] = useState({})
    // useEffect(() => { }, []);

    return (
        <div className="p-3">
            {user?.uid ?
                <>
                    <p className="mb-2 h3 text-center">Welcome to News App</p>
                    <News />
                </>
                : <Redirect to="/signup" />
            }
        </div>
    )
}

export default Home;