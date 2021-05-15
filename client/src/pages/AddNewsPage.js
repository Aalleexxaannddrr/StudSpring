import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useHistory, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'

export const AddNewsPage = () => {

    const history = useHistory()
    const organizer_id = useParams().id
    const [title, setTitle] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [addres, setAddres] = useState('')
    const [age_category, setAgeCatecory] = useState('')
    const [contribution, setContribution] = useState('')
    const [game_type, setGameType] = useState('')
    const [cover_type, setCoverType] = useState('')
    const participants_id = [""]
    const { loading, request } = useHttp()

    const pressHandler = async () => {
        try {
            await request('/api/competition/add', 'POST', { title: title, organizer_id: organizer_id, start: start, end: end, addres: addres, age_category: age_category, contribution: contribution, game_type: game_type, cover_type: cover_type, participants_id: participants_id})
            history.push('/competition')
        } catch (e) { }
    }
    
    if (loading) {
        return <Loader />
    }

    const enableCheck = (title, start, end, addres, age_category, contribution, game_type, cover_type) => {
        if (title && start && end && addres && age_category && contribution && game_type && cover_type && !loading) {
            return (false)
        } else {
            return (true)
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="register-input-field">
                    <h4>Добавление новости</h4>
                    <b>Название новости</b>
                    <input
                        placeholder="Название соревнований"
                        id="name"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <p>Период проведения</p>
                    <p>с</p>
                    <input
                        placeholder="Начало соревнований"
                        id="start"
                        type="Date"
                        value={start}
                        onChange={e => setStart(e.target.value)}
                    />
                    <p>по</p>
                    <input
                        placeholder="Конец соревнований"
                        id="end"
                        type="Date"
                        value={end}
                        onChange={e => setEnd(e.target.value)}
                    />
                    <p>Адрес проведения</p>
                    <input
                        placeholder="Адрес проведения"
                        id="addres"
                        type="text"
                        value={addres}
                        onChange={e => setAddres(e.target.value)}
                    />
                    <p>Возрастная категория</p>
                    <select className="browser-default"
                        onChange={e => setAgeCatecory(e.target.value)}>
                        <option value="" >Возрастная категория</option>
                        <option value="14-18 лет">14-18 лет</option>    
                        <option value="19-35 лет">19-35 лет</option>    
                        <option value="старше 35 лет">старше 35 лет</option>    
                    </select>
                    <p>Взнос</p>
                    <input
                        placeholder="Взнос"
                        id="contribution"
                        type="number"
                        value={contribution}
                        onChange={e => setContribution(e.target.value)}
                    />
                    <p>Тип игры</p>
                    <select className="browser-default"
                        onChange={e => setGameType(e.target.value)}>
                        <option value="" >Тип игры</option>
                        <option value="Одиночная - женская">Одиночная - женская</option>    
                        <option value="Одиночная - мужская">Одиночная - мужская</option>    
                        <option value="Парная - женская">Парная - женская</option>    
                        <option value="Парная - мужская">Парная - мужская</option>    
                    </select>
                    <p>Тип покрытия</p>
                    <select className="browser-default"
                        onChange={e => setCoverType(e.target.value)}>
                        <option value="" >Тип покрытия</option>
                        <option value="Трава">Трава</option>    
                        <option value="Хард">Хард</option>    
                        <option value="Грунт">Грунт</option>    
                        <option value="Ковер">Ковер</option>    
                    </select>
                </div>
                <button className="waves-effect waves-light btn" onClick={pressHandler} disabled={enableCheck(title, start, end, addres, age_category, contribution, game_type, cover_type)}>Опубликовать</button>
            </div>
        </div>
    )
}