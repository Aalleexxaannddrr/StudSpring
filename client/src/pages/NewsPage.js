import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import Moment from 'moment'
import { useHistory } from 'react-router-dom'

export const NewsPage = () => {
     
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const [news, setNews] = useState([])
    const history = useHistory()
    
    const getNews = useCallback(async () => {
        try {
            const fetched = await request('/api/news', 'GET', null)
            setNews(fetched)
        } catch (e) { }
    }, [request])

    useEffect(() => {
        getNews()
    }, [getNews])

    if (loading) {
        return <Loader /> 
    }

    const deleteNews = async (id) => {
        try {
            await request(`/api/news/${id}`, 'DELETE', {})
            document.location.reload()
        } catch (e) {}
    }

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {auth.isOrganizer && <Link className="btn-floating btn-large waves-effect waves-light #607d8b blue-grey" to={'/add_news'}><i className="material-icons left">add</i></Link>}
            {news.map((x) => {
                return (
                    <div className="news_div">
                        {auth.isOrganizer && <button className="waves-effect waves-light btn #3e2723 brown darken-4" onClick={() => deleteNews(x._id)}><i className="material-icons left">delete</i></button>}
                        {auth.isOrganizer && <Link className="btn-floating btn-large waves-effect waves-light btn" to={`/change_news/${x._id}`}><i className="material-icons">edit</i></Link>}
                        <h4>{x.title}</h4>
                        <p>{x.content}</p>
                        <img src={x.img} alt="pricol"></img>
                        <p className="date">Дата: {Moment(x.date).format("DD.MM.YYYY")}</p>
                    </div>
                )
            })}
        </div>
    )
}