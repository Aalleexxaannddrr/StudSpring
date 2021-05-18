import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/Loader'

export const AddNewsPage = () => {

    const history = useHistory()
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const { loading, request } = useHttp()

    const pressHandler = async () => {
        try {
            const date = new Date()
            console.log(title, date, description, img)
            // await request('/api/competition/add', 'POST', { title: title, img: img, date: date, description: description})
            // history.push('/news')
        } catch (e) { }
    }
    
    if (loading) {
        return <Loader />
    }

    const enableCheck = (title, img, description) => {
        if (title && img && description && !loading) {
            return (false)
        } else {
            return (true)
        }
    }

    const selectFile = (e) => {
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onloadend = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(file) 
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="register-input-field">
                    <h4>Добавление новости</h4>
                    <b>Заголовок</b>
                    <input
                        placeholder="Заголовок"
                        id="name"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <p>Изображение к новости</p>
                    <input
                        id="start"
                        type="file"
                        onChange={selectFile}
                    />
                    <p></p>
                    {img && <img className="news-image" src={img} alt="pricol"/>}
                    <p>Описание</p>
                    <textarea
                        placeholder="Описание"
                        id="textarea1"
                        className="materialize-textarea"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <button className="waves-effect waves-light btn" onClick={pressHandler} disabled={enableCheck(title, img, description)}>Опубликовать</button>
            </div>
        </div>
    )
}