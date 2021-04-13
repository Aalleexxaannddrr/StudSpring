import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Moment from 'moment'

export const CompetitionInfoPage = () => {
    
    let i = 0
    const id = useParams().id
    const [competition, setCompetition] = useState('')
    const [participants, setParticipants] = useState([])
    const { loading, request } = useHttp()
    const history = useHistory()

    const getInfo = useCallback(async () => {
        try {
            const fetched = await request(`/api/competition/${id}`, 'GET', null)
            setCompetition(fetched)
            const fetched3 = await request(`/api/participant/`, 'GET', null)
            setParticipants(fetched3)
        } catch (e) { }
    }, [id, request])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    const pressHandler = event => {
        history.push('/competition')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <h3>{competition.name}</h3>
            <p>Начало соревнования: {Moment(competition.start).format("DD.MM.YYYY")}</p>
            <p>Окончание соревнования: {Moment(competition.end).format("DD.MM.YYYY")}</p>
            <p>Адрес проведения: {competition.addres}</p>
            <p>Возростная категория: {competition.age_category}</p>
            <p>Взнос: {competition.contribution}</p>
            <p>Тип игры: {competition.game_type}</p>
            <p>Тип покрытия: {competition.cover_type}</p>
            <p>Список участников:</p>
            {participants.map(pretendent => {
                let j = ''
                let qwe 
                (competition.participants_id).forEach(participant_id => {
                    if (participant_id === pretendent._id) {
                        qwe = pretendent.name
                        i++
                        j = i + '. '
                    }
                })
                return (
                    <p key={pretendent._id}>{ j }{qwe}</p>
                )
            })}
            <button className="waves-effect waves-light btn #3e2723 brown darken-4" onClick={() => pressHandler()}>Вернуться к списку соревнований</button>
        </>
    )
}