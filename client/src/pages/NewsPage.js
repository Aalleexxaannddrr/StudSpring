import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import {AuthContext} from '../context/AuthContext'

export const NewsPage = () => {
     
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    const getNews = useCallback(async () => {
        try {
            const fetched = await request('/api/competition', 'GET', null)
            
        } catch (e) { }
    }, [request])

    useEffect(() => {
        
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {auth.isOrganizer && <Link className="btn-floating btn-large waves-effect waves-light #607d8b blue-grey" to={'/add_news'}><i class="material-icons left">add</i></Link>}
        </div>
    )
}