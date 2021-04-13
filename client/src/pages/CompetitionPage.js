import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link, useHistory } from 'react-router-dom'
import Moment from 'moment'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/Loader'

export const CompetitionPage = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)
    const [id, setId] = useState('')
    const { request, loading } = useHttp()
    const [competitions, setCompetitions] = useState([])
    const message = useMessage()
    let participants_id = []
    const [participants, setParticipants] = useState([])
    const [users, setUsers] = useState([])
    
    const getInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/competition', 'GET', null)
            setCompetitions(fetched)
            const fetched1 = await request('/api/participant', 'GET', null)
            setParticipants(fetched1)
            const fetched2 = await request('/api/user', 'GET', null)
            setUsers(fetched2)
            const pricol = await auth.userId
            setId(pricol)
        } catch (e) { }
    }, [request, auth.userId])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    if (loading) {
        return <Loader />
    }

    const pressHandler = async (com) => {
        const date = new Date()
        if (!auth.isAuthenticated) {
            message("Для участия необходимо войти в систему")
            history.push('/auth')
        }
        if (auth.isOrganizer) {
            message("Организатор не может участвовать")
        } else {
        participants_id = com.participants_id
        let q = false
        let w = false
        if (auth.isAuthenticated) {
            users.forEach(user => {
                if (user._id === auth.userId){
                    participants.forEach(participant => {
                        if (user.email === participant.email) {
                            const date2 = Moment(participant.birthday).format("YYYY")
                            const difference = date.getFullYear() - date2
                            if ((com.age_category === "14-18 лет" && (14 <= difference && difference <= 18))
                                || (com.age_category === "19-35 лет" && (19 <= difference && difference <= 35))
                                || (com.age_category === "старше 35 лет" && (35 <= difference))) {
                                (com.participants_id).forEach(participant_id => {
                                    if (participant_id === participant._id) {
                                        message("Вы уже подали заявку на участие в данном соревновании")
                                        q = true
                                    }
                                })
                                if (!q) {
                                    participants_id.push(participant._id)
                                }
                            } else {
                                message("Вы не подходите по возрастной категории")
                                w = true
                            }
                        }
                    })
                }
            })
            if (!q && !w) {
                await request(`/api/competition/${com._id}`, 'PUT', { name: com.name, organizer_id: com.organizer_id, start: com.start, end: com.end, addres: com.addres, age_category: com.age_category, contribution: com.contribution, game_type: com.game_type, cover_type: com.cover_type, participants_id: participants_id })
                message("Участник был добавлен")
            }
        }
    }
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <table>
                <thead>
                    <tr>
                        <th>Название соревнования</th>
                        <th>Начало сорвенования</th>
                        <th>Окончание сорвевнования</th>
                        <th>Посмотреть подробную информацию</th>
                        <th>Подать заявление на участние</th>
                    </tr>
                </thead>

                <tbody>
                    {competitions.map((competition) => {
                        const data1 = Moment(competition.start).format("DD.MM.YYYY")
                        const data2 = Moment(competition.end).format("DD.MM.YYYY")
                        return (
                            <tr key={competition._id}>
                                <td>{competition.name}</td>
                                <td>{data1}</td>
                                <td>{data2}</td>
                                <td>{<Link className="waves-effect waves-light btn #3e2723 brown darken-4" to={`/competition_info/${competition._id}`}>Открыть информацию</Link>}</td>
                                <td>{<button className="waves-effect waves-light btn #3e2723 brown darken-4" onClick={() => pressHandler(competition)}>Участвовать</button>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {auth.isOrganizer && <Link className="waves-effect waves-light btn" to={`/competition_register/${id}`}>Организовать соревнование</Link>}
        </>
    )
}