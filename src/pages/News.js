import React, { useContext, useState } from "react"
import axios from "axios"
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, CardImg, Card, CardBody, CardTitle, CardSubtitle, ButtonGroup } from 'reactstrap'
import { FaRegStar, FaStar } from "react-icons/fa"
import { toast } from "react-toastify";
import newsContext from "../context/newsContext";
const News = () => {
    const { user, setUser } = useContext(newsContext);
    const countries = [{ code: 'in', name: "India" }, { code: 'us', name: "USA" }, { code: 'ca', name: "Canada" }] // load from firebase realtime storage
    const [isTopHeadlines, setIsTopHeadlines] = useState(false)
    const [search, setSearch] = useState("")
    const [country, setCountry] = useState("in")
    const [news, setNews] = useState([])
    const [favNews, setFavNews] = useState([]);

    const handleNewsType = (event) => {
        if (event.target.value === "everything") {
            setIsTopHeadlines(false);
        } else {
            setIsTopHeadlines(true);
        }
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleCountry = (event) => {
        setCountry(event.target.value)
    }

    const handleSearchNews = async (event) => {
        event.preventDefault();
        if (!isTopHeadlines && search === "") return toast("Please enter something to search!", { type: "warning" })
        let url = getApiUrl(
            process.env.REACT_APP_NEWSAPI_BASEURL,
            isTopHeadlines ? `${process.env.REACT_APP_NEWSAPI_TOPHEADLINES}country=${country}`
                :
                `${process.env.REACT_APP_NEWSAPI_EVERYTHING}q=${search}`
        )
        console.log(url);
        await axios.get(url,
            {
                "headers": {
                    "X-Api-Key": process.env.REACT_APP_NEWSAPI_APIKEY
                }
            }
        ).then(res => {
            console.log(res.data);
            setNews(res.data.articles)
        }).catch(err => {
            console.log(err)
        })

    }

    const handleFavNews = (article, event) => {
        event.preventDefault();
        const newsInfoObj = {
            url: article.url,
            title: article.title
        }
        console.log(article.url)
        if (favNews.length !== 0) {
            const found = favNews.find(news => news.url === article.url);
            if (found) {
                console.log("found? : " + found.title);
                setFavNews(favNews.filter(news => news.url !== article.url));
                return;
            }
            else {
                setFavNews([...favNews, newsInfoObj]);
            }
        } else {
            setFavNews([...favNews, newsInfoObj]);
        }
        console.log(favNews);
        setUser({ ...user, favNews });
    }

    const getApiUrl = (...args) => {
        let urlString = "";
        args.map(arg => (urlString += arg))
        return urlString
    }

    const displayDate = (articleDate) => {
        let date = new Date(articleDate)
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }
    return (
        <div>
            <Form md={6} className="offset-md-3 mb-3">
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="everything" value="everything" checked={isTopHeadlines === false} onChange={handleNewsType} />{' '}
                        everything
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="top-headlines" value="top-headlines" checked={isTopHeadlines === true} onChange={handleNewsType} />{' '}
                        Top-headlines
                    </Label>
                </FormGroup>
                {isTopHeadlines ?
                    <FormGroup>
                        <Row>
                            <Label for="countrySelect" sm={2}>Select Country</Label>
                            <Col md={6}>
                                <Input type="select" name="select" id="countrySelect" onChange={handleCountry}>
                                    {countries.map((country, index) => {
                                        return <option key={index} value={country.code}> {country.name}</option>
                                    })}
                                </Input>
                            </Col>
                        </Row>
                    </FormGroup>
                    :
                    <FormGroup>
                        <Row>
                            <Label htmlFor="searchbar" sm={2}>Search News</Label>
                            <Col md={6}>
                                <Input type="text" name="search" id="search" placeholder="Search your interests" value={search} onChange={handleSearch} />
                            </Col>
                        </Row>
                    </FormGroup>}
                {/* add a toast message if the search string is empty */}
                <Button onClick={handleSearchNews} style={{ display: "block" }}>Search News</Button>
            </Form>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridGap: "2%", marginBottom: "2%" }}>
                {news ? news.map((article, index) => {
                    return (
                        <Card key={index}>
                            <CardImg top width="100%" src={article.urlToImage} alt="news image" />
                            <CardBody>
                                <CardTitle tag="h4">{article.title}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{article.description}</CardSubtitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{article.publishedAt ? `Published on: ${displayDate(article.publishedAt)}` : null}</CardSubtitle>
                                <div className="d-flex justify-content-between">
                                    <Button href={article.url} target="_blank" rel="noreferrer">Read More</Button>
                                    <span value={favNews} onClick={(event) => { handleFavNews(article, event) }}>
                                        {favNews.find(news => news.url === article.url) ? <FaStar size={30} /> : <FaRegStar size={30} />}
                                    </span>
                                </div>
                            </CardBody>
                        </Card>

                    )
                })
                    : null
                }
            </div>
        </div >
    )
}

export default News